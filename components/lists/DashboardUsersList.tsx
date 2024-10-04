import { api } from '@/convex/_generated/api'
import { UsersDashboardListProps } from '@/types'
import { useQuery } from 'convex/react'
import React from 'react'
import CustomSkeleton from '../CustomSkeleton'
import EmptyTransactionsRow from '../emptyStateUI/EmptyTransactionsRow'
import UsersRow from '../tableUI/UsersRow'
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

const DashboardUsersList = ({
  showActionBtn,
  num,
  dateFilter,
  sort
}: UsersDashboardListProps) => {
  const transactions = useQuery(api.users.getUsersList, {
    num,
    dateFilter,
    sort
  })

  function renderUsersView() {
    if (!transactions)
      return <CustomSkeleton type="transactions-list" count={4} />
    if (transactions.length === 0) return <EmptyTransactionsRow />
    return transactions.map(({ _id, ...props }) => (
      <UsersRow {...{ ...props }} key={_id} />
    ))
  }

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Customers</CardTitle>
          <CardDescription>Recent customers from your store.</CardDescription>
        </div>
        {showActionBtn && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/customers">
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
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderUsersView()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default DashboardUsersList
