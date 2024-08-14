import { CustomSkeletonProps } from '@/types'
import { Skeleton } from './ui/skeleton'

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

  switch (type) {
    case 'podcasts':
      return <PodcastsListSkeleton />
    default:
      break
  }
}

export default CustomSkeleton
