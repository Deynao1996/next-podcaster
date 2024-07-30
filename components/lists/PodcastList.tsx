import React from 'react'
import PodcastBox from '../PodcastBox'
import { PodcastListProps } from '@/types'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import LoadingSpinner from '../LoadingSpinner'

//TODO Check loading state

const queryFns = {
  trending: api.podcasts.getTrendingPodcasts,
  similar: api.podcasts.getPodcastByVoiceType,
  discover: api.podcasts.getPodcastBySearch,
  user: api.podcasts.getPodcastByUserId
}

const PodcastList = ({
  renderTitle,
  renderEmptyState,
  label,
  queryParams = {}
}: PodcastListProps) => {
  const podcasts = useQuery(queryFns[label], queryParams)

  if (!podcasts) return <LoadingSpinner />

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
