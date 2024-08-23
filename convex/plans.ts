import { ConvexError, v } from 'convex/values'
import { internalMutation, internalQuery, query } from './_generated/server'
import { GenericQueryCtx } from 'convex/server'
import { DataModel } from './_generated/dataModel'

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
    if (!currentPlan) throw new ConvexError('No plan found')
    return currentPlan.tokens
  }
})
