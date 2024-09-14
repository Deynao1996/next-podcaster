'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import CustomSkeleton from '../CustomSkeleton'

const SalesList = () => {
  const newSubscriptions = useQuery(api.stats.getRecentSubscriptions, {})
  if (!newSubscriptions)
    return <CustomSkeleton type="subscriptions" count={4} />

  return (
    <Card x-chunk="dashboard-01-chunk-5" className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Recent Subscriptions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {newSubscriptions.map((sub) => {
          const fallBackAvatar = sub.name.substring(0, 2).toUpperCase()
          return (
            <div className="flex items-center gap-4" key={sub.userId}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={sub.userImageUrl} alt="Avatar" />
                <AvatarFallback>{fallBackAvatar}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {sub.userName}
                </p>
                <p className="text-muted-foreground text-sm">{sub.userEmail}</p>
              </div>
              <div className="ml-auto font-medium capitalize">
                {sub.name + ' Plan'}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default SalesList
