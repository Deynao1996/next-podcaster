import { v } from 'convex/values'
import { clerkClient } from '@clerk/clerk-sdk-node'
import { query } from './_generated/server'

export const testQuery = query({
  args: {},
  async handler(ctx, args) {
    const test = ctx.auth.getUserIdentity()
    return test
  }
})
