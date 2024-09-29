import { ConvexError, v } from 'convex/values'
import { internalMutation, query } from './_generated/server'
import { checkDashboardViewPermission } from './stats'
import { GenericQueryCtx } from 'convex/server'
import { DataModel, Id } from './_generated/dataModel'

export function isDateFilterValid(dateFilter?: string) {
  if (!dateFilter) return
  if (
    dateFilter === 'week' ||
    dateFilter === 'month' ||
    dateFilter === 'year' ||
    'all'
  ) {
    return true
  } else {
    return false
  }
}

export function setDateFilterRange(dateFilter: string) {
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
    .take(num ? num : 1000)
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
    dateFilter: v.optional(v.string()),
    sort: v.optional(
      v.union(v.literal('fulfilled'), v.literal('paid'), v.literal('oldest'))
    )
  },
  handler: async (ctx, { num, dateFilter, sort }) => {
    // await checkDashboardViewPermission(ctx)
    //Filter by date filter
    let payments: {
      _id: Id<'payments'>
      _creationTime: number
      status?: 'pending' | 'paid' | undefined
      stripeId?: string | undefined
      message?: string | undefined
      userId: string
      amount: number
    }[]
    if (!dateFilter || !isDateFilterValid(dateFilter) || dateFilter === 'all') {
      payments = await ctx.db
        .query('payments')
        .order('desc')
        .take(num ? num : 1000)
    } else {
      payments = await filterPaymentsByDate(ctx, dateFilter, num)
    }

    //Sort by query params
    if (sort === 'oldest') {
      payments = payments.sort((a, b) => {
        if (a._creationTime > b._creationTime) return 1
        if (a._creationTime < b._creationTime) return -1
        return 0
      })
    } else if (sort === 'paid') {
      payments = payments.sort((a, b) => {
        if (a.status === 'paid' && b.status === 'pending') return -1
        if (a.status === 'pending' && b.status === 'paid') return 1
        return 0
      })
    } else {
      payments = payments
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
          creationTime: p._creationTime,
          imageUrl: user.imageUrl
        }
      })
    )
    return transactions
  }
})
