import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { DashboardStatsProps, SeparateStatsProps } from '@/types'
import Link from 'next/link'
import CustomSkeleton from './CustomSkeleton'

const DashboardStats = ({
  title,
  description,
  actionHref,
  actionTitle,
  stats
}: DashboardStatsProps) => {
  if (!stats) return <CustomSkeleton type="separate-stats" count={2} />
  const {
    currentMonthGoalCompare,
    currentSubscriptionsMonthTotal,
    prevMonthGoalCompare,
    previousSubscriptionsMonthTotal
  } = stats

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={actionHref}>{actionTitle}</Link>
          </Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">
            {currentSubscriptionsMonthTotal}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-xs">
            {`${currentMonthGoalCompare}% more to reach a goal`}
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            value={100 - currentMonthGoalCompare}
            aria-label={`${100 - currentMonthGoalCompare} increase`}
          />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>Previous Month</CardDescription>
          <CardTitle className="text-4xl">
            {previousSubscriptionsMonthTotal}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-xs">
            {`${prevMonthGoalCompare}% more to reach a goal`}
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            value={100 - prevMonthGoalCompare}
            aria-label={`${100 - prevMonthGoalCompare} increase`}
          />
        </CardFooter>
      </Card>
    </div>
  )
}

export default DashboardStats
