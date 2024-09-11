import { ConvexError, v } from 'convex/values'
import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query
} from './_generated/server'
import { GenericQueryCtx } from 'convex/server'
import { DataModel } from './_generated/dataModel'
import { internal } from './_generated/api'

const getPlansByUserIdQuery = async (
  ctx: GenericQueryCtx<DataModel>,
  userId: string
) => {
  return await ctx.db
    .query('plans')
    .filter((q) => q.eq(q.field('userId'), userId))
    .unique()
}

export const create = internalMutation({
  args: {
    userId: v.string(),
    tokens: v.number(),
    name: v.union(v.literal('pro'), v.literal('unlimited'), v.literal('free')),
    interval: v.union(v.literal('month'), v.literal('year'), v.literal('no')),
    startTime: v.number(),
    endTime: v.number(),
    subscriptionId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('plans', { ...args })
  }
})

export const updatePlan = internalMutation({
  args: {
    tokens: v.number(),
    name: v.union(v.literal('pro'), v.literal('unlimited')),
    interval: v.union(v.literal('month'), v.literal('year')),
    startTime: v.number(),
    endTime: v.number(),
    subscriptionId: v.string(),
    planId: v.id('plans')
  },
  handler: async (ctx, { planId, ...args }) => {
    return await ctx.db.patch(planId, { ...args })
  }
})

export const getPlansByUserIdInternal = internalQuery({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await getPlansByUserIdQuery(ctx, args.userId)
  }
})

export const getPlansByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await getPlansByUserIdQuery(ctx, args.userId)
  }
})

export const getTokensByUserId = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.userId) return
    const currentPlan = await ctx.db
      .query('plans')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .unique()
    if (!currentPlan) return 0
    return currentPlan.tokens
  }
})

export const unsubscribePlan = mutation({
  args: {
    userId: v.string()
  },
  handler: async (ctx, args) => {
    const currentPlan = await ctx.db
      .query('plans')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .unique()
    if (!currentPlan) throw new ConvexError('No plan found')
    if (!currentPlan.subscriptionId)
      throw new ConvexError('You can not unsubscribe from a free plan')
    await ctx.scheduler.runAfter(0, internal.stripe.unsubscribe, {
      subscriptionId: currentPlan.subscriptionId
    })
    await ctx.db.patch(currentPlan._id, {
      subscriptionId: undefined,
      endTime: 0,
      tokens: 150,
      name: 'free',
      interval: 'no',
      startTime: Date.now()
    })
  }
})
