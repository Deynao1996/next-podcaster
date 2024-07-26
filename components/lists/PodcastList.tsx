import React from 'react'
import PodcastBox from '../PodcastBox'
import { PodcastListProps } from '@/types'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'

//TODO Check loading state

const queryFns = {
  trending: api.podcasts.getTrendingPodcasts
}

const PodcastList = ({
  renderTitle,
  renderEmptyState,
  label
}: PodcastListProps) => {
  const podcasts = useQuery(queryFns[label])

  return (
    <div className="pt-9">
      {renderTitle()}
      {podcasts?.length === 0 && renderEmptyState?.()}
      <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {podcasts?.map((podcast) => (
          <PodcastBox key={podcast._id} {...podcast} />
        ))}
      </ul>
    </div>
  )
}

export default PodcastList
