import { ConvexError, v } from 'convex/values'
import { query } from './_generated/server'
import { GenericQueryCtx } from 'convex/server'
import { CustomIdentity } from '@/types'
import {
  DAILY_GOAL_SALES,
  DASHBOARD_PERMISSION,
  MONTH_GOAL_PODCASTS,
  MONTH_GOAL_SUBSCRIPTIONS
} from '@/constants'
import { DataModel } from './_generated/dataModel'

type FormStats = {
  ctx: GenericQueryCtx<DataModel>
  dates: {
    startOfCurrentMonth: number
    startOfNextMonth: number
    startOfPreviousMonth: number
    endOfPreviousMonth: number
  }
}

export async function checkDashboardViewPermission(
  ctx: GenericQueryCtx<DataModel>
) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new ConvexError('Unauthorized')
  const customIdentity = identity as CustomIdentity
  const userPermissions = customIdentity.membership_permission
  const isValid = userPermissions.some((p) => p === DASHBOARD_PERMISSION)
  if (!isValid) throw new ConvexError('Unauthorized')
}

function calcPercentageChange(prevTotal: number, currTotal: number) {
  const percentChange =
    prevTotal === 0
      ? currTotal > 0
        ? 100
        : 0
      : ((currTotal - prevTotal) / prevTotal) * 100
  return Math.round(percentChange)
}

function calcTotalAmount(
  monthPayments: {
    amount: number
  }[]
) {
  return monthPayments.reduce((sum, payment) => sum + payment.amount, 0)
}

function generateCurrPrevMonthRange() {
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
  return {
    startOfCurrentMonth,
    startOfNextMonth,
    startOfPreviousMonth,
    endOfPreviousMonth
  }
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
    plansPercentChange,
    currentSubscriptionsMonthTotal,
    previousSubscriptionsMonthTotal
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
    podcastsPercentChange,
    currentPodcastsMonthTotal,
    previousPodcastsMonthTotal
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
    usersPercentChange,
    currentUsersMonthTotal,
    previousUsersMonthTotal
  }
}

export const getStats = query({
  args: {},
  async handler(ctx, args) {
    // await checkDashboardViewPermission(ctx)
    const dates = generateCurrPrevMonthRange()

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

export const getRecentSubscriptions = query({
  args: { num: v.optional(v.number()) },
  async handler(ctx, args) {
    const plans = await ctx.db
      .query('plans')
      .order('desc')
      .take(args.num || 5)
    const subscriptions = await Promise.all(
      plans.map(async (plan) => {
        const user = await ctx.db
          .query('users')
          .filter((q) => q.eq(q.field('clerkId'), plan.userId))
          .unique()
        if (!user) {
          throw new ConvexError('User not found')
        }

        return {
          name: plan.name,
          userName: user.name,
          userId: user.clerkId,
          userImageUrl: user.imageUrl,
          userEmail: user.email
        }
      })
    )
    return subscriptions
  }
})

export const getDailySales = query({
  args: {},
  async handler(ctx, args) {
    const now = new Date()
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime()

    const startOfTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    ).getTime()

    const year = now.getFullYear()
    const month = now.toLocaleString('default', { month: 'long' })
    const day = now.getDate()
    const currentDay = `${month} ${day}, ${year}`

    const todaysPayments = await ctx.db
      .query('payments')
      .filter((q) =>
        q.and(
          q.gte(q.field('_creationTime'), startOfToday),
          q.lt(q.field('_creationTime'), startOfTomorrow),
          q.eq(q.field('status'), 'paid')
        )
      )
      .collect()

    const todaysSalesTotal = todaysPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    )
    const percentageDailyChange = (todaysSalesTotal * 100) / DAILY_GOAL_SALES

    return { todaysSalesTotal, percentageDailyChange, currentDay }
  }
})

export const getCurrPrevSubscriptionStats = query({
  args: {},
  async handler(ctx, args) {
    // await checkDashboardViewPermission(ctx)
    const dates = generateCurrPrevMonthRange()
    const { currentSubscriptionsMonthTotal, previousSubscriptionsMonthTotal } =
      await formSubscriptionsStats({ ctx, dates })
    const currentMonthGoalCompare = calcPercentageChange(
      MONTH_GOAL_SUBSCRIPTIONS,
      currentSubscriptionsMonthTotal
    )
    const prevMonthGoalCompare = calcPercentageChange(
      MONTH_GOAL_SUBSCRIPTIONS,
      previousSubscriptionsMonthTotal
    )
    return {
      currentMonthTotal: currentSubscriptionsMonthTotal,
      previousMonthTotal: previousSubscriptionsMonthTotal,
      currentMonthGoalCompare: Math.abs(currentMonthGoalCompare),
      prevMonthGoalCompare: Math.abs(prevMonthGoalCompare)
    }
  }
})

export const getCurrPrevPodcastStats = query({
  args: {},
  async handler(ctx, args) {
    // await checkDashboardViewPermission(ctx)
    const dates = generateCurrPrevMonthRange()
    const { currentPodcastsMonthTotal, previousPodcastsMonthTotal } =
      await formPodcastsStats({ ctx, dates })
    const currentMonthGoalCompare = calcPercentageChange(
      MONTH_GOAL_PODCASTS,
      currentPodcastsMonthTotal
    )
    const prevMonthGoalCompare = calcPercentageChange(
      MONTH_GOAL_PODCASTS,
      previousPodcastsMonthTotal
    )
    return {
      currentMonthTotal: currentPodcastsMonthTotal,
      previousMonthTotal: previousPodcastsMonthTotal,
      currentMonthGoalCompare: Math.abs(currentMonthGoalCompare),
      prevMonthGoalCompare: Math.abs(prevMonthGoalCompare)
    }
  }
})

export const getCurrPrevUsersStats = query({
  args: {},
  async handler(ctx, args) {
    // await checkDashboardViewPermission(ctx)
    const dates = generateCurrPrevMonthRange()
    const { currentUsersMonthTotal, previousUsersMonthTotal } =
      await formUsersStats({ ctx, dates })
    const currentMonthGoalCompare = calcPercentageChange(
      MONTH_GOAL_PODCASTS,
      currentUsersMonthTotal
    )
    const prevMonthGoalCompare = calcPercentageChange(
      MONTH_GOAL_PODCASTS,
      previousUsersMonthTotal
    )
    return {
      currentMonthTotal: currentUsersMonthTotal,
      previousMonthTotal: previousUsersMonthTotal,
      currentMonthGoalCompare: Math.abs(currentMonthGoalCompare),
      prevMonthGoalCompare: Math.abs(prevMonthGoalCompare)
    }
  }
})
