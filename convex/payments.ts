import { ConvexError, v } from 'convex/values'
import { internalMutation, query } from './_generated/server'

export const create = internalMutation({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db.insert('payments', {
      userId
    })
  }
})

export const markPending = internalMutation({
  args: {
    paymentId: v.id('payments'),
    stripeId: v.string()
  },
  handler: async (ctx, { paymentId, stripeId }) => {
    await ctx.db.patch(paymentId, { stripeId, status: 'pending' })
  }
})

export const fulfill = internalMutation({
  args: { stripeId: v.string() },
  handler: async (ctx, { stripeId }) => {
    const payment = await ctx.db
      .query('payments')
      .filter((q) => q.eq(q.field('stripeId'), stripeId))
      .unique()
    if (!payment) {
      throw new ConvexError('Payment not found')
    }
    await ctx.db.patch(payment._id, {
      message: 'Your payment was successful. Enjoy your new plan!',
      status: 'paid'
    })
  }
})

export const getMessageByPaymentId = query({
  args: { paymentId: v.optional(v.id('payments')) },
  handler: async (ctx, { paymentId }) => {
    const payment = await ctx.db
      .query('payments')
      .filter((q) => q.eq(q.field('_id'), paymentId))
      .unique()
    if (!payment) return
    return payment.message
  }
})
