'use client'

import PieStatChart from '@/components/chartsUI/PieStatChart'
import DashboardStats from '@/components/DashboardStats'
import TransactionsList from '@/components/lists/TransactionsList'
import TabsDataTable from '@/components/TabsDataTable'
import { dropdownTransactionListFilters } from '@/constants'
import { api } from '@/convex/_generated/api'
import { DateFilter } from '@/types'
import { useQuery } from 'convex/react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

const SubscriptionsPage = () => {
  const prevCurrSubscriptionStats = useQuery(
    api.stats.getCurrPrevSubscriptionStats,
    {}
  )
  const [dropdownFilter, setDropdownFilter] = useQueryState(
    'filter',
    parseAsStringLiteral(dropdownTransactionListFilters).withDefault(
      'fulfilled'
    )
  )

  function renderTabsContentList(dateFilter: DateFilter) {
    return <TransactionsList dateFilter={dateFilter} sort={dropdownFilter} />
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 md:p-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="col-span-3 grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <DashboardStats
          actionTitle="Create Subscription"
          title="Your Subscriptions"
          description="View and manage all active, pending, and canceled subscriptions. Easily track user payments, monitor subscription statuses, and check renewal dates."
          actionHref="/coming-soon"
          stats={prevCurrSubscriptionStats}
        />
      </div>
      <div className="max-lg:col-span-3">
        <PieStatChart
          title="Total Subscribers for last months"
          stats={prevCurrSubscriptionStats}
          chartLabel="Subscribers"
          description="Showing total subscriptions for the last 2 months"
        />
      </div>
      <div className="col-span-3">
        <TabsDataTable
          renderTabsContentList={renderTabsContentList}
          dropdownFilter={dropdownFilter}
          setDropdownFilter={setDropdownFilter}
          filterType="transactions"
        />
      </div>
    </main>
  )
}

export default SubscriptionsPage
