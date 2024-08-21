'use node'

import { v } from 'convex/values'
import { action, internalAction } from './_generated/server'
import Stripe from 'stripe'
import { internal } from './_generated/api'

export const pay = action({
  args: {
    userId: v.string(),
    amount: v.number(),
    interval: v.union(v.literal('month'), v.literal('year'))
  },
  handler: async (ctx, { userId, amount, interval }) => {
    const domain = process.env.HOSTING_URL ?? 'http://localhost:3000'
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: '2024-06-20',
      typescript: true
    })

    const paymentId = await ctx.runMutation(internal.payments.create, {
      userId
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

    await ctx.runMutation(internal.payments.markPending, {
      paymentId,
      stripeId: session.id
    })
    return session.url
  }
})

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, { signature, payload }) => {
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: '2024-06-20',
      typescript: true
    })
    console.log('fullfill')

    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET as string
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      )
      if (event.type === 'checkout.session.completed') {
        const stripeId = (event.data.object as { id: string }).id
        await ctx.runMutation(internal.payments.fulfill, { stripeId })
      }
      return { success: true }
    } catch (err) {
      console.error(err)
      return { success: false }
    }
  }
})
