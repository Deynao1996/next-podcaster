'use client'

import LatestPodcastList from '@/components/lists/LatestPodcastList'
import PodcastList from '@/components/lists/PodcastList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const HomePage = () => {
  const tasks = useQuery(api.tasks.get)

  return (
    <main className="bg-secondary text-secondary-foreground px-4 pb-9 sm:px-8">
      <PodcastList
        renderTitle={() => (
          <h1 className="scroll-m-20 text-xl font-semibold">
            Trending Podcasts
          </h1>
        )}
      />
      <LatestPodcastList
        renderTitle={() => (
          <h2 className="scroll-m-20 text-xl font-semibold">Latest Podcasts</h2>
        )}
      />
      <PodcastList
        renderTitle={() => (
          <h3 className="scroll-m-20 text-xl font-semibold">
            Popular Podcasts
          </h3>
        )}
      />
    </main>
  )
}

export default HomePage
