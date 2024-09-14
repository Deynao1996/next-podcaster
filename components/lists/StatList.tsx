'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { statListInfo } from '@/constants'
import CustomSkeleton from '../CustomSkeleton'

const StatList = () => {
  const stats = useQuery(api.stats.getStats, {})

  if (!stats) return <CustomSkeleton type="stats" count={4} />

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {stats.map((stat) => {
        const title = statListInfo[stat.label].title
        const Icon = statListInfo[stat.label].Icon
        return (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="text-primary h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.totalAmount}</div>
              <p className="text-muted-foreground text-xs">
                {`${stat.percentChange}% from last month`}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default StatList
