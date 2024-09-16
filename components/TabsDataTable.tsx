'use client'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListFilter } from 'lucide-react'
import { Button } from './ui/button'
import TransactionsList from './lists/TransactionsList'
import { useState } from 'react'
import { DateFilter } from '@/types'

const TabsDataTable = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('week')

  return (
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger
            className="data-[state=active]:bg-background"
            value="week"
            onClick={() => setDateFilter('week')}
          >
            Week
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-background"
            value="month"
            onClick={() => setDateFilter('month')}
          >
            Month
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-background"
            value="year"
            onClick={() => setDateFilter('year')}
          >
            Year
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent value="week">
        <TransactionsList dateFilter={dateFilter} />
      </TabsContent>
      <TabsContent value="month">
        <TransactionsList dateFilter={dateFilter} />
      </TabsContent>
      <TabsContent value="year">
        <TransactionsList dateFilter={dateFilter} />
      </TabsContent>
    </Tabs>
  )
}

export default TabsDataTable
