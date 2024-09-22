import { CustomSkeletonProps } from '@/types'
import { Skeleton } from './ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { TableBody, TableCell, TableRow } from './ui/table'

const CustomSkeleton = ({ type, count = 1 }: CustomSkeletonProps) => {
  const PodcastsListSkeleton = () => {
    return (
      <ul className="mt-5 grid grid-cols-1 gap-4 px-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(count)].map((_, i) => {
          return (
            <div key={i}>
              <Skeleton className="bg-background h-48" />
              <Skeleton className="bg-background mt-2 h-5 rounded-sm" />
              <Skeleton className="bg-background mt-2 h-10 rounded-sm" />
            </div>
          )
        })}
      </ul>
    )
  }

  const LatestPodcastsSkeleton = () => {
    return (
      <ul className="mt-5 flex flex-col gap-4">
        {[...Array(count)].map((_, i) => {
          return (
            <div key={i}>
              <Skeleton className="bg-background mt-2 h-16 rounded-sm" />
            </div>
          )
        })}
      </ul>
    )
  }

  const SignedInUserSkeleton = () => {
    return (
      <ul className="mt-3 px-8">
        {[...Array(count)].map((_, i) => {
          return (
            <div key={i}>
              <Skeleton className="h-10 rounded-sm" />
            </div>
          )
        })}
      </ul>
    )
  }

  const UserSliderSkeleton = () => {
    return (
      <ul className="mt-4">
        {[...Array(count)].map((_, i) => {
          return (
            <div key={i}>
              <Skeleton className="h-[300px] rounded-lg" />
            </div>
          )
        })}
      </ul>
    )
  }

  const TopPodcastersSkeleton = () => {
    return (
      <ul className="mt-5 space-y-3 px-8">
        {[...Array(count)].map((_, i) => {
          return (
            <div key={i}>
              <Skeleton className="h-12 rounded-sm" />
            </div>
          )
        })}
      </ul>
    )
  }

  const ProfileSkeleton = () => {
    return (
      <ul className="mt-5">
        {[...Array(count)].map((_, i) => {
          return (
            <div key={i} className="flex flex-col gap-5 sm:flex-row">
              <Skeleton className="bg-background aspect-square h-[250px] rounded-sm" />
              <div className="flex flex-col justify-between py-4">
                <div className="space-y-5">
                  <Skeleton className="bg-background h-6 w-32 rounded-sm" />
                  <Skeleton className="bg-background h-10 w-28 rounded-sm" />
                  <Skeleton className="bg-background h-8 w-64 rounded-sm" />
                </div>
                <Skeleton className="bg-background h-12 w-64 rounded-sm" />
              </div>
            </div>
          )
        })}
      </ul>
    )
  }

  const StatSkeleton = () => {
    return (
      <ul className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {[...Array(count)].map((_, i) => {
          return (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <Skeleton className="h-6 rounded-sm" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-14 rounded-sm" />
              </CardContent>
            </Card>
          )
        })}
      </ul>
    )
  }

  const SubscriptionsListSkeleton = () => {
    return (
      <Card x-chunk="dashboard-01-chunk-5" className="xl:col-span-2">
        <CardHeader>
          <Skeleton className="h-10 w-[250px] rounded-sm" />
        </CardHeader>
        <CardContent className="grid gap-6">
          {[...Array(count)].map((_, i) => {
            return <Skeleton className="h-12 rounded-sm" key={i} />
          })}
        </CardContent>
      </Card>
    )
  }

  const RadialChartSkeleton = () => {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <Skeleton className="h-10 w-[150px] rounded-sm" />
          <Skeleton className="h-6 w-[170px] rounded-sm" />
        </CardHeader>
        <CardContent className="mt-7 flex flex-1 items-center justify-center pb-0">
          <Skeleton className="h-[180px] w-[180px] rounded-full" />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Skeleton className="mt-5 h-6 w-[180px] rounded-sm" />
          <Skeleton className="h-4 w-[160px] rounded-sm" />
        </CardFooter>
      </Card>
    )
  }

  const TransactionsListSkeleton = () => {
    return (
      <>
        {[...Array(count)].map((_, i) => {
          return (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-6 rounded-sm" />
              </TableCell>
              <TableCell className="table-cell">
                <Skeleton className="h-6 rounded-sm" />
              </TableCell>
              <TableCell className="table-cell">
                <Skeleton className="h-6 rounded-sm" />
              </TableCell>
              <TableCell>
                <Skeleton className="ml-auto h-6 rounded-sm" />
              </TableCell>
            </TableRow>
          )
        })}
      </>
    )
  }

  switch (type) {
    case 'podcasts':
      return <PodcastsListSkeleton />
    case 'latest':
      return <LatestPodcastsSkeleton />
    case 'user':
      return <SignedInUserSkeleton />
    case 'slider':
      return <UserSliderSkeleton />
    case 'top-podcasters':
      return <TopPodcastersSkeleton />
    case 'profile':
      return <ProfileSkeleton />
    case 'stats':
      return <StatSkeleton />
    case 'subscriptions':
      return <SubscriptionsListSkeleton />
    case 'radial-chart':
      return <RadialChartSkeleton />
    case 'transactions-list':
      return <TransactionsListSkeleton />
    default:
      break
  }
}

export default CustomSkeleton
