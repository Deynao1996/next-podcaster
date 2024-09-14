import { ConvexError } from 'convex/values'
import { query } from './_generated/server'
import { GenericQueryCtx } from 'convex/server'
import { CustomIdentity } from '@/types'
import { DASHBOARD_PERMISSION } from '@/constants'

type FormStats = {
  ctx: GenericQueryCtx<any>
  dates: {
    startOfCurrentMonth: number
    startOfNextMonth: number
    startOfPreviousMonth: number
    endOfPreviousMonth: number
  }
}

async function checkDashboardViewPermission(ctx: GenericQueryCtx<any>) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new ConvexError('Unauthorized')
  const customIdentity = identity as CustomIdentity
  const userPermissions = customIdentity.membership_permission
  const isValid = userPermissions.some((p) => p === DASHBOARD_PERMISSION)
  if (!isValid) throw new ConvexError('Unauthorized')
}

function calcPercentageChange(
  previousMonthTotal: number,
  currentMonthTotal: number
) {
  const percentChange =
    previousMonthTotal === 0
      ? currentMonthTotal > 0
        ? 100
        : 0
      : ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
  return Math.round(percentChange)
}

function calcTotalAmount(
  monthPayments: {
    amount: number
  }[]
) {
  return monthPayments.reduce((sum, payment) => sum + payment.amount, 0)
}

async function formRevenueStats({
  ctx,
  dates: {
    startOfCurrentMonth,
    startOfNextMonth,
    startOfPreviousMonth,
    endOfPreviousMonth
  }
}: FormStats) {
  const payments = await ctx.db.query('payments').collect()
  const currentMonthPayments = await ctx.db
    .query('payments')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startOfCurrentMonth),
        q.lt(q.field('_creationTime'), startOfNextMonth)
      )
    )
    .collect()
  const previousMonthPayments = await ctx.db
    .query('payments')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startOfPreviousMonth),
        q.lt(q.field('_creationTime'), endOfPreviousMonth)
      )
    )
    .collect()

  const currentRevenueMonthTotal = calcTotalAmount(currentMonthPayments)
  const previousRevenueMonthTotal = calcTotalAmount(previousMonthPayments)
  const revenuePercentChange = calcPercentageChange(
    previousRevenueMonthTotal,
    currentRevenueMonthTotal
  )

  const revenueTotalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  )
  return {
    revenueTotalAmount,
    revenuePercentChange
  }
}

async function formSubscriptionsStats({
  ctx,
  dates: {
    startOfCurrentMonth,
    startOfNextMonth,
    startOfPreviousMonth,
    endOfPreviousMonth
  }
}: FormStats) {
  const plans = await ctx.db
    .query('plans')
    .filter((q) => q.neq(q.field('name'), 'free'))
    .collect()
  const currentMonthPlans = await ctx.db
    .query('plans')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startOfCurrentMonth),
        q.lt(q.field('_creationTime'), startOfNextMonth),
        q.neq(q.field('name'), 'free')
      )
    )
    .collect()
  const previousMonthPlans = await ctx.db
    .query('plans')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startOfPreviousMonth),
        q.lt(q.field('_creationTime'), endOfPreviousMonth),
        q.neq(q.field('name'), 'free')
      )
    )
    .collect()

  const currentSubscriptionsMonthTotal = currentMonthPlans.length
  const previousSubscriptionsMonthTotal = previousMonthPlans.length
  const plansPercentChange = calcPercentageChange(
    previousSubscriptionsMonthTotal,
    currentSubscriptionsMonthTotal
  )

  const plansTotalAmount = plans.length
  return {
    plansTotalAmount,
    plansPercentChange
  }
}

async function formPodcastsStats({
  ctx,
  dates: {
    startOfCurrentMonth,
    startOfNextMonth,
    startOfPreviousMonth,
    endOfPreviousMonth
  }
}: FormStats) {
  const podcasts = await ctx.db.query('podcasts').collect()
  const currentMonthPodcasts = await ctx.db
    .query('podcasts')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startOfCurrentMonth),
        q.lt(q.field('_creationTime'), startOfNextMonth)
      )
    )
    .collect()
  const previousMonthPodcasts = await ctx.db
    .query('podcasts')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startOfPreviousMonth),
        q.lt(q.field('_creationTime'), endOfPreviousMonth)
      )
    )
    .collect()

  const currentPodcastsMonthTotal = currentMonthPodcasts.length
  const previousPodcastsMonthTotal = previousMonthPodcasts.length
  const podcastsPercentChange = calcPercentageChange(
    previousPodcastsMonthTotal,
    currentPodcastsMonthTotal
  )

  const podcastsTotalAmount = podcasts.length
  return {
    podcastsTotalAmount,
    podcastsPercentChange
  }
}

async function formUsersStats({
  ctx,
  dates: {
    startOfCurrentMonth,
    startOfNextMonth,
    startOfPreviousMonth,
    endOfPreviousMonth
  }
}: FormStats) {
  const users = await ctx.db.query('users').collect()
  const currentMonthUsers = await ctx.db
    .query('users')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startOfCurrentMonth),
        q.lt(q.field('_creationTime'), startOfNextMonth)
      )
    )
    .collect()
  const previousMonthUsers = await ctx.db
    .query('users')
    .filter((q) =>
      q.and(
        q.gte(q.field('_creationTime'), startOfPreviousMonth),
        q.lt(q.field('_creationTime'), endOfPreviousMonth)
      )
    )
    .collect()

  const currentUsersMonthTotal = currentMonthUsers.length
  const previousUsersMonthTotal = previousMonthUsers.length
  const usersPercentChange = calcPercentageChange(
    previousUsersMonthTotal,
    currentUsersMonthTotal
  )

  const usersTotalAmount = users.length
  return {
    usersTotalAmount,
    usersPercentChange
  }
}

export const getStats = query({
  args: {},
  async handler(ctx, args) {
    // await checkDashboardViewPermission(ctx)
    const now = new Date()
    const startOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).getTime()
    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    ).getTime()
    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    ).getTime()
    const endOfPreviousMonth = startOfCurrentMonth
    const dates = {
      startOfCurrentMonth,
      startOfNextMonth,
      startOfPreviousMonth,
      endOfPreviousMonth
    }

    const { revenuePercentChange, revenueTotalAmount } = await formRevenueStats(
      {
        ctx,
        dates
      }
    )
    const { plansPercentChange, plansTotalAmount } =
      await formSubscriptionsStats({
        ctx,
        dates
      })
    const { podcastsPercentChange, podcastsTotalAmount } =
      await formPodcastsStats({
        ctx,
        dates
      })
    const { usersPercentChange, usersTotalAmount } = await formUsersStats({
      ctx,
      dates
    })

    return [
      {
        percentChange: revenuePercentChange,
        totalAmount: revenueTotalAmount,
        label: 'revenue' as const
      },
      {
        percentChange: plansPercentChange,
        totalAmount: plansTotalAmount,
        label: 'subscriptions' as const
      },
      {
        percentChange: podcastsPercentChange,
        totalAmount: podcastsTotalAmount,
        label: 'podcasts' as const
      },
      {
        percentChange: usersPercentChange,
        totalAmount: usersTotalAmount,
        label: 'users' as const
      }
    ]
  }
})
