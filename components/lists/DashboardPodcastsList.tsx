'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import EmptyTransactionsRow from '../emptyStateUI/EmptyTransactionsRow'
import CustomSkeleton from '../CustomSkeleton'
import PodcastsRow from '../tableUI/PodcastsRow'
import { PodcastsDashboardListProps } from '@/types'

const DashboardPodcastsList = ({
  showActionBtn,
  num,
  dateFilter,
  sort
}: PodcastsDashboardListProps) => {
  const transactions = useQuery(api.podcasts.getTransactionsList, {
    num,
    dateFilter,
    sort
  })

  function renderPodcastsView() {
    if (!transactions)
      return <CustomSkeleton type="transactions-list" count={4} />
    if (transactions.length === 0) return <EmptyTransactionsRow />
    return transactions.map(({ podcastId, ...props }) => (
      <PodcastsRow {...{ ...props }} key={podcastId} />
    ))
  }

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Podcasts</CardTitle>
          <CardDescription>Recent podcasts from your store.</CardDescription>
        </div>
        {showActionBtn && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/podcasts">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Podcast</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderPodcastsView()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default DashboardPodcastsList
