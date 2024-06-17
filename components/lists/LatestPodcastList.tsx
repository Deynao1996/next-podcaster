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
      <div className="flex justify-between items-center">
        {renderTitle()}
        <Button asChild variant="link">
          <Link href={'/'}>See all</Link>
        </Button>
      </div>
      <ul className="mt-5 flex flex-col gap-4">
        {[...Array(4)].map((_, index) => (
          <Fragment key={index}>
            <LatestPodcast i={index} />
            <li className="h-px bg-muted-foreground opacity-25 w-[calc(100%-0.75rem-0.625rem)] ml-auto" />
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default LatestPodcastList
