'use client'

import PieStatChart from '@/components/chartsUI/PieStatChart'
import DashboardStats from '@/components/DashboardStats'
import DashboardPodcastsList from '@/components/lists/DashboardPodcastsList'
import TabsDataTable from '@/components/TabsDataTable'
import { dropdownPodcastsListFilters } from '@/constants'
import { api } from '@/convex/_generated/api'
import { DateFilter } from '@/types'
import { useQuery } from 'convex/react'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

const PodcastsPage = () => {
  const prevCurrPodcastStats = useQuery(api.stats.getCurrPrevPodcastStats, {})
  const [dropdownFilter, setDropdownFilter] = useQueryState(
    'filter',
    parseAsStringLiteral(dropdownPodcastsListFilters).withDefault('fulfilled')
  )

  function renderTabsContentList(dateFilter: DateFilter) {
    return (
      <DashboardPodcastsList dateFilter={dateFilter} sort={dropdownFilter} />
    )
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 md:p-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="col-span-3 grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <DashboardStats
          actionTitle="Create Podcast"
          title="Your Podcasts"
          description="View and manage all created podcasts. Easily track all user podcasts and check for new episodes."
          actionHref="/dashboard/podcasts/create"
          stats={prevCurrPodcastStats}
        />
      </div>
      <div className="max-lg:col-span-3">
        <PieStatChart
          stats={prevCurrPodcastStats}
          description="Showing total podcast for the last 2 months"
          title="Total Podcasts"
          chartLabel="Podcasts"
        />
      </div>
      <div className="col-span-3">
        <TabsDataTable
          renderTabsContentList={renderTabsContentList}
          dropdownFilter={dropdownFilter}
          setDropdownFilter={setDropdownFilter}
        />
      </div>
    </main>
  )
}

export default PodcastsPage
