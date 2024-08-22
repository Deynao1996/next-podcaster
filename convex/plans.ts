import { ConvexError, v } from 'convex/values'
import { internalMutation, query } from './_generated/server'

export const create = internalMutation({
  args: {
    userId: v.string(),
    tokens: v.number(),
    name: v.union(v.literal('pro'), v.literal('unlimited')),
    interval: v.union(v.literal('month'), v.literal('year')),
    startTime: v.number(),
    endTime: v.number(),
    subscriptionId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('plans', { ...args })
  }
})
