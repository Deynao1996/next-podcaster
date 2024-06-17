import LatestPodcastList from '@/components/lists/LatestPodcastList'
import PodcastList from '@/components/lists/PodcastList'
import React from 'react'

const HomePage = () => {
  return (
    <main className="pb-9 px-8 bg-secondary text-secondary-foreground">
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
