'use client'

import PieStatChart from '@/components/chartsUI/PieStatChart'
import DashboardStats from '@/components/DashboardStats'
import DashboardUsersList from '@/components/lists/DashboardUsersList'
import TabsDataTable from '@/components/TabsDataTable'
import { dropdownUsersListFilters } from '@/constants'
import { api } from '@/convex/_generated/api'
import { DateFilter } from '@/types'
import { useQuery } from 'convex/react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

const CustomersPage = () => {
  const prevCurrUsersStats = useQuery(api.stats.getCurrPrevUsersStats, {})
  const [dropdownFilter, setDropdownFilter] = useQueryState(
    'filter',
    parseAsStringLiteral(dropdownUsersListFilters).withDefault('fulfilled')
  )

  function renderTabsContentList(dateFilter: DateFilter) {
    return <DashboardUsersList dateFilter={dateFilter} sort={dropdownFilter} />
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 md:p-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="col-span-3 grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <DashboardStats
          actionTitle="Create User"
          title="Your Customers"
          description="View and manage all created users. Easily track all users and check for new users."
          actionHref="/coming-soon"
          stats={prevCurrUsersStats}
        />
      </div>
      <div className="max-lg:col-span-3">
        <PieStatChart
          stats={prevCurrUsersStats}
          description="Showing total users for the last 2 months"
          title="Total Users"
          chartLabel="Users"
        />
      </div>
      <div className="col-span-3">
        <TabsDataTable
          renderTabsContentList={renderTabsContentList}
          dropdownFilter={dropdownFilter}
          setDropdownFilter={setDropdownFilter}
          filterType="users"
        />
      </div>
    </main>
  )
}

export default CustomersPage
