import Link from 'next/link'
import { Fragment } from 'react'
import { Button } from '../ui/button'
import LatestPodcast from '../LatestPodcast'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import CustomSkeleton from '../CustomSkeleton'

type LatestPodcastListProps = {
  renderTitle: () => React.ReactNode
}

const LatestPodcastList = ({ renderTitle }: LatestPodcastListProps) => {
  const latestPodcasts = useQuery(api.podcasts.getLatestPodcasts)

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        {renderTitle()}
        <Button asChild variant="link" className="p-0">
          <Link href={'/discover'}>See all</Link>
        </Button>
      </div>
      {!latestPodcasts ? (
        <CustomSkeleton type="latest" count={4} />
      ) : (
        <ul className="mt-5 flex flex-col gap-4">
          {latestPodcasts.map((podcast, index, arr) => (
            <Fragment key={index}>
              <LatestPodcast i={index} {...podcast} />
              {index !== arr.length - 1 && (
                <li className="bg-muted-foreground ml-auto h-px w-[calc(100%-0.75rem-0.625rem)] opacity-25" />
              )}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LatestPodcastList
