'use client'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import PopularPodcastSlider from '../PopularPodcastSlider'
import TopPodcastsList from './TopPodcastsList'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import LoadingSpinner from '../LoadingSpinner'

const PopularPodcastList = () => {
  const popularPodcasts = useQuery(api.users.getTopUserByPodcastCount, {
    search: '',
    length: 4
  })

  if (!popularPodcasts) return <LoadingSpinner />

  return (
    <div>
      <div className="px-8">
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-xl font-semibold">Fans Also Like</h4>
          <Button asChild variant="link" className="p-0">
            <Link href={'/discover'}>See all</Link>
          </Button>
        </div>
        <PopularPodcastSlider popularPodcasts={popularPodcasts} />
      </div>
      <div className="mt-10">
        <TopPodcastsList popularPodcasts={popularPodcasts} />
      </div>
    </div>
  )
}

export default PopularPodcastList
