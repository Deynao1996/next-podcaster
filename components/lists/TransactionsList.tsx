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
import { TransactionsListProps } from '@/types'
import TransactionsRow from '../tableUI/TransactionsRow'
import EmptyTransactionsRow from '../emptyStateUI/EmptyTransactionsRow'
import CustomSkeleton from '../CustomSkeleton'

const TransactionsList = ({
  showActionBtn,
  num,
  dateFilter,
  sort
}: TransactionsListProps) => {
  const transactions = useQuery(api.payments.getLatestTransactions, {
    num,
    dateFilter,
    sort
  })

  function renderTransactionsView() {
    if (!transactions)
      return <CustomSkeleton type="transactions-list" count={4} />
    if (transactions.length === 0) return <EmptyTransactionsRow />
    return transactions.map(({ userId, ...props }, i) => (
      <TransactionsRow {...{ ...props }} key={`${i}${userId}`} />
    ))
  }

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        {showActionBtn && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/subscriptions">
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
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderTransactionsView()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TransactionsList
