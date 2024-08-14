import React, { useEffect } from 'react'
import PodcastBox from '../PodcastBox'
import { PodcastListProps } from '@/types'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import LoadingSpinner from '../LoadingSpinner'
import CustomSkeleton from '../CustomSkeleton'

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

  return (
    <div className="pt-9">
      {renderTitle()}
      {podcasts?.length === 0 && renderEmptyState?.()}
      {!podcasts ? (
        <CustomSkeleton type="podcasts" count={4} />
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {podcasts?.map((podcast) => (
            <PodcastBox key={podcast._id} {...podcast} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default PodcastList
