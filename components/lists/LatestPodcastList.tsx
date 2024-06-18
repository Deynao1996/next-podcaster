import Link from 'next/link'
import { Fragment } from 'react'
import { Button } from '../ui/button'
import LatestPodcast from '../LatestPodcast'

type LatestPodcastListProps = {
  renderTitle: () => React.ReactNode
}

const LatestPodcastList = ({ renderTitle }: LatestPodcastListProps) => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        {renderTitle()}
        <Button asChild variant="link">
          <Link href={'/'}>See all</Link>
        </Button>
      </div>
      <ul className="mt-5 flex flex-col gap-4">
        {[...Array(4)].map((_, index) => (
          <Fragment key={index}>
            <LatestPodcast i={index} />
            {index !== 4 - 1 && (
              <li className="bg-muted-foreground ml-auto h-px w-[calc(100%-0.75rem-0.625rem)] opacity-25" />
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default LatestPodcastList
