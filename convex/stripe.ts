'use node'

import { v } from 'convex/values'
import { action, internalAction } from './_generated/server'
import Stripe from 'stripe'
import { internal } from './_generated/api'
import { planMap } from '@/constants'

function checkCurrentPlan(amount: number) {
  return planMap[amount]
}

async function createStripeSession({
  paymentId,
  amount,
  interval
}: {
  paymentId: string
  amount: number
  interval: 'month' | 'year'
}) {
  const domain = process.env.HOSTING_URL ?? 'http://localhost:3000'
  const stripe = new Stripe(process.env.STRIPE_KEY!, {
    apiVersion: '2024-06-20',
    typescript: true
  })

  const session: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'USD',
            unit_amount: amount * 100,
            tax_behavior: 'exclusive',
            recurring: { interval },
            product_data: {
              name: 'Podcaster',
              description: "Subscribe to the plan that's right for you",
              images: [
                'https://res.cloudinary.com/dkl9cqqui/image/upload/v1724066042/bg-img_qxepxq.png'
              ]
            }
          },
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${domain}?paymentId=${paymentId}`,
      cancel_url: `${domain}`
    })
  return session
}

export const pay = action({
  args: {
    userId: v.string(),
    amount: v.number(),
    interval: v.union(v.literal('month'), v.literal('year'))
  },
  handler: async (ctx, { userId, amount, interval }) => {
    const paymentId = await ctx.runMutation(internal.payments.create, {
      userId
    })

    const session = await createStripeSession({ paymentId, amount, interval })
    await ctx.runMutation(internal.payments.markPending, {
      paymentId,
      stripeId: session.id
    })
    return session.url
  }
})

async function handleSessionComplete({
  event,
  ctx,
  stripe
}: {
  event: Stripe.Event
  ctx: any
  stripe: Stripe
}) {
  if (event.type === 'checkout.session.completed') {
    const stripeId = (event.data.object as { id: string }).id
    const userId = await ctx.runMutation(internal.payments.fulfill, {
      stripeId
    })

    const subscriptionId = event.data.object.subscription?.toString()
    if (!subscriptionId) return { success: false }
    const currentSubscription =
      await stripe.subscriptions.retrieve(subscriptionId)
    const amount = currentSubscription.items.data[0].plan.amount
    if (!amount) return { success: false }
    const endTime = currentSubscription.current_period_end
    const startTime = currentSubscription.current_period_start

    const exchangedAmount = amount / 100
    const { interval, name, tokens } = checkCurrentPlan(exchangedAmount)

    await ctx.runMutation(internal.plans.create, {
      userId,
      name,
      interval,
      endTime,
      startTime,
      tokens,
      subscriptionId
    })
  }
}

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, { signature, payload }) => {
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: '2024-06-20',
      typescript: true
    })
    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET as string
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      )
      await handleSessionComplete({
        event,
        ctx,
        stripe
      })

      if (event.type === 'checkout.session.async_payment_failed') {
        return { success: false }
        //TODO handle payment failed
      }

      return { success: true }
    } catch (err) {
      console.error(err)
      return { success: false }
    }
  }
})
