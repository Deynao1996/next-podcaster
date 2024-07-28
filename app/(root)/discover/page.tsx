'use client'

import EmptyState from '@/components/EmptyState'
import PodcastSearchBar from '@/components/PodcastSearchBar'
import PodcastList from '@/components/lists/PodcastList'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const CreatePodcastPage = () => {
  return (
    <section className="bg-secondary text-secondary-foreground px-4 py-9 sm:px-8">
      <PodcastSearchBar />
      <PodcastList
        label="trending"
        renderEmptyState={() => (
          <EmptyState
            title="No results found"
            subtitle="Try adjusting your search to find what you are looking for"
          />
        )}
        renderTitle={() => (
          <div className="flex items-center justify-between">
            <h6 className="scroll-m-20 text-xl font-semibold">
              Discover Community Podcasts
            </h6>
            <Button variant={'outline'}>
              <Image
                src="/icons/filter-lines.svg"
                className="h-4 w-4 md:mr-2"
                alt="menu"
                width={24}
                height={24}
              />
              <p className="hidden md:block">Apply filter</p>
              <div className="bg-primary text-primary-foreground ml-2 flex h-3 w-3 items-center justify-center rounded-full p-2.5 text-[0.6rem]">
                <p>1</p>
              </div>
            </Button>
          </div>
        )}
      />
    </section>
  )
}

export default CreatePodcastPage
