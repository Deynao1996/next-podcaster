'use client'

import PieStatChart from '@/components/chartsUI/PieStatChart'
import DashboardStats from '@/components/DashboardStats'
import TabsDataTable from '@/components/TabsDataTable'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'

const SubscriptionsPage = () => {
  const prevCurrSubscriptionStats = useQuery(
    api.stats.getCurrPrevSubscriptionStats,
    {}
  )

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 md:p-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="col-span-3 grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <DashboardStats
          actionTitle="Create Subscription"
          title="Your Subscriptions"
          description="View and manage all active, pending, and canceled subscriptions. Easily track user payments, monitor subscription statuses, and check renewal dates."
          actionHref="/dashboard/subscriptions/create"
          stats={prevCurrSubscriptionStats}
        />
      </div>
      <div className="max-lg:col-span-3">
        <PieStatChart stats={prevCurrSubscriptionStats} />
      </div>
      <div className="col-span-3">
        <TabsDataTable />
      </div>
    </main>
  )
}

export default SubscriptionsPage
