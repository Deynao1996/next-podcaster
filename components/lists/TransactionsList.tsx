'use client'

import React from 'react'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Badge } from '../ui/badge'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { TransactionsListProps } from '@/types'

//TODO ADD loading state
//TODO ADD empty state
//TODO Add smooth scroll after changing tabs
//TODO Check isActive nav link

const TransactionsList = ({
  showActionBtn,
  num,
  dateFilter
}: TransactionsListProps) => {
  const transactions = useQuery(api.payments.getLatestTransactions, {
    num,
    dateFilter
  })

  if (!transactions) return

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
            <Link href="/dashboard/subscriptions?dateFilter=week">
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
          <TableBody>
            {transactions.map(
              ({
                amount,
                creationTime,
                status,
                userEmail,
                userId,
                userName
              }) => {
                const isPending = status === 'pending' || status === undefined

                return (
                  <TableRow key={userId}>
                    <TableCell>
                      <div className="font-medium">{userName}</div>
                      <div className="text-muted-foreground hidden text-sm md:inline">
                        {userEmail}
                      </div>
                    </TableCell>
                    <TableCell className="table-cell">
                      <Badge
                        className={cn('border-green-500 text-xs capitalize', {
                          'border-primary': isPending
                        })}
                        variant="outline"
                      >
                        {isPending ? 'pending' : status}
                      </Badge>
                    </TableCell>
                    <TableCell className="table-cell">
                      {new Date(creationTime).toLocaleDateString('en-US')}
                    </TableCell>
                    <TableCell className="text-right">${amount}</TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TransactionsList
