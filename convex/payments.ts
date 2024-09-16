import { ConvexError, v } from 'convex/values'
import { internalMutation, query, QueryCtx } from './_generated/server'
import { checkDashboardViewPermission } from './stats'
import { GenericQueryCtx } from 'convex/server'
import { DataModel } from './_generated/dataModel'

function isDateFilterValid(dateFilter?: string) {
  if (!dateFilter) return
  if (
    dateFilter === 'week' ||
    dateFilter === 'month' ||
    dateFilter === 'year'
  ) {
    return true
  } else {
    return false
  }
}

function setDateFilterRange(dateFilter: string) {
  const now = new Date()
  let startRange, endRange
  if (dateFilter === 'week') {
    const currentDayOfWeek = now.getDay()
    startRange = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - currentDayOfWeek
    ).getTime()
    endRange = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - currentDayOfWeek + 7
    ).getTime()
  } else if (dateFilter === 'month') {
    startRange = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
    endRange = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime()
  } else {
    startRange = new Date(now.getFullYear(), 0, 1).getTime()
    endRange = new Date(now.getFullYear() + 1, 0, 0).getTime()
  }
  return {
    startRange,
    endRange
  }
}

async function filterPaymentsByDate(
  ctx: GenericQueryCtx<DataModel>,
  dateFilter: string,
  num?: number
) {
  const { startRange, endRange } = setDateFilterRange(dateFilter)
  return await ctx.db
    .query('payments')
    .order('desc')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startRange),
        q.lt(q.field('_creationTime'), endRange)
      )
    )
    .take(num ? num : 100)
}

export const create = internalMutation({
  args: { userId: v.string(), amount: v.number() },
  handler: async (ctx, { userId, amount }) => {
    return await ctx.db.insert('payments', {
      userId,
      amount
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
    return payment.userId
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

export const getLatestTransactions = query({
  args: {
    num: v.optional(v.number()),
    dateFilter: v.optional(v.string())
  },
  handler: async (ctx, { num, dateFilter }) => {
    // await checkDashboardViewPermission(ctx)
    let payments
    if (!dateFilter || !isDateFilterValid(dateFilter)) {
      payments = await ctx.db
        .query('payments')
        .order('desc')
        .take(num ? num : 100)
    } else {
      payments = await filterPaymentsByDate(ctx, dateFilter, num)
    }

    const transactions = await Promise.all(
      payments.map(async (p) => {
        const user = await ctx.db
          .query('users')
          .filter((q) => q.eq(q.field('clerkId'), p.userId))
          .unique()
        if (!user) {
          throw new ConvexError('User not found')
        }

        return {
          userName: user.name,
          userId: user.clerkId,
          userEmail: user.email,
          amount: p.amount,
          status: p.status,
          creationTime: p._creationTime
        }
      })
    )
    return transactions
  }
})
