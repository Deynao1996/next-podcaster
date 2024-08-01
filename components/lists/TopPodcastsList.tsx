import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import TopPodcaster from '../TopPodcaster'
import { PopularPodcastProps } from '@/types'
import { Id } from '@/convex/_generated/dataModel'

const TopPodcastsList = ({
  popularPodcasts
}: {
  popularPodcasts: PopularPodcastProps[]
}) => {
  return (
    <div>
      <div className="flex items-center justify-between px-8">
        <h5 className="scroll-m-20 text-xl font-semibold">Top Podcasters</h5>
        <Button asChild variant="link" className="p-0">
          <Link href={'/discover/podcasters'}>See all</Link>
        </Button>
      </div>
      <ul className="mt-5 space-y-3">
        {popularPodcasts.map(
          ({ clerkId, imageUrl, name, totalPodcasts, totalViews }) => (
            <TopPodcaster
              key={clerkId}
              imageUrl={imageUrl}
              name={name}
              totalPodcasts={totalPodcasts}
              clerkId={clerkId}
              totalViews={totalViews}
            />
          )
        )}
      </ul>
    </div>
  )
}

export default TopPodcastsList
