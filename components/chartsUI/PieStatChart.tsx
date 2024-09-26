'use client'

import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { SeparatePieChartStatsProps } from '@/types'
import CustomSkeleton from '../CustomSkeleton'

export const description = 'A donut chart with text'

const chartConfig = {
  visitors: {
    label: 'Subscribers'
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))'
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

const PieStatChart = ({ stats }: { stats?: SeparatePieChartStatsProps }) => {
  if (!stats) return <CustomSkeleton type="pie-chart" />

  const { currentSubscriptionsMonthTotal, previousSubscriptionsMonthTotal } =
    stats

  const currentMonthName = new Date().toLocaleString('default', {
    month: 'long'
  })
  const prevMonthName = new Date(
    new Date().setMonth(new Date().getMonth() - 1)
  ).toLocaleDateString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()
  const cardDescription = `${prevMonthName} - ${currentMonthName} ${currentYear}`

  const chartData = [
    {
      browser: prevMonthName,
      visitors: previousSubscriptionsMonthTotal,
      fill: 'var(--color-safari)'
    },
    {
      browser: currentMonthName,
      visitors: currentSubscriptionsMonthTotal,
      fill: 'var(--color-chrome)'
    }
  ]

  const totalSubscribers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="capitalize">
          Total Subscribers for last months
        </CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSubscribers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Subscribers
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total subscriptions for the last 2 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default PieStatChart
