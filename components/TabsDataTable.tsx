'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListFilter } from 'lucide-react'
import { Button } from './ui/button'
import { useRef, useState } from 'react'
import { DateFilter, TabsDataTableProps } from '@/types'
import {
  dateTransactionListFilters,
  dropdownPodcastsListFilters,
  dropdownTransactionListFilters
} from '@/constants'

const dropdownFilterCfg = {
  transactions: dropdownTransactionListFilters,
  podcasts: dropdownPodcastsListFilters
}

const TabsDataTable = <T,>({
  renderTabsContentList,
  dropdownFilter,
  setDropdownFilter,
  filterType
}: TabsDataTableProps<T>) => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('week')
  const bottomRef = useRef<HTMLDivElement>(null)
  const dropdownFilterOptions = dropdownFilterCfg[filterType]

  function scrollToBottom() {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  function handleDateFilterChange(date: DateFilter) {
    setDateFilter(date)
    setDropdownFilter('fulfilled' as T)
    scrollToBottom()
  }

  function handleValueChange(value: typeof dropdownFilter) {
    setDropdownFilter(value)
    scrollToBottom()
  }

  return (
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          {dateTransactionListFilters.map((d) => (
            <TabsTrigger
              key={d}
              className="data-[state=active]:bg-background capitalize"
              value={d}
              onClick={() => handleDateFilterChange(d)}
            >
              {d}
            </TabsTrigger>
          ))}
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
              <DropdownMenuRadioGroup
                value={dropdownFilter as string}
                onValueChange={(v) => handleValueChange(v as T)}
              >
                {dropdownFilterOptions.map((f) => (
                  <DropdownMenuRadioItem
                    value={f}
                    key={f}
                    className="capitalize"
                  >
                    {f}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {dateTransactionListFilters.map((d) => (
        <TabsContent value={d} key={d}>
          {renderTabsContentList(dateFilter)}
        </TabsContent>
      ))}
      <div ref={bottomRef} />
    </Tabs>
  )
}

export default TabsDataTable
