'use client'

import { TrendingUp } from 'lucide-react'
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { DAILY_GOAL_SALES } from '@/constants'
import CustomSkeleton from '../CustomSkeleton'

const chartConfig = {
  sales: {
    label: 'Visitors'
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

const RadialChart = () => {
  const dailySales = useQuery(api.stats.getDailySales, {})

  if (!dailySales) return <CustomSkeleton type="radial-chart" />

  const chartData = [
    {
      browser: 'safari',
      sales: dailySales.todaysSalesTotal,
      fill: 'var(--color-safari)'
    }
  ]
  const chartAngle = (dailySales.percentageDailyChange * 360) / 100
  const goalRemain = DAILY_GOAL_SALES - dailySales.todaysSalesTotal
  const goalStatus =
    goalRemain < 0
      ? 'Podcaster already achieved a goal'
      : `$${goalRemain} more to reach goal`

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Daily Sales</CardTitle>
        <CardDescription>{dailySales.currentDay}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={chartAngle}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="sales" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {'$' + chartData[0].sales.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Incomes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {goalStatus} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total today sales
        </div>
      </CardFooter>
    </Card>
  )
}

export default RadialChart
