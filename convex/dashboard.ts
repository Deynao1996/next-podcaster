import { ConvexError } from 'convex/values'
import { query } from './_generated/server'
import { GenericQueryCtx } from 'convex/server'
import { CustomIdentity } from '@/types'
import { DASHBOARD_PERMISSION } from '@/constants'

async function checkDashboardViewPermission(ctx: GenericQueryCtx<any>) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new ConvexError('Unauthorized')
  const customIdentity = identity as CustomIdentity
  const userPermissions = customIdentity.membership_permission
  const isValid = userPermissions.some((p) => p === DASHBOARD_PERMISSION)
  if (!isValid) throw new ConvexError('Unauthorized')
}

export const testQuery = query({
  args: {},
  async handler(ctx, args) {
    await checkDashboardViewPermission(ctx)
    return 123
  }
})
