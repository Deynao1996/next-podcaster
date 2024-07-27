'use client'

import EmptyState from '@/components/EmptyState'
import PodcastList from '@/components/lists/PodcastList'
import LoadingSpinner from '@/components/LoadingSpinner'
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { DetailsPageProps } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

//TODO Check all aria labels
//TODO Check Image warnings
//TODO Restyle login default page

const DetailsPage = ({ params: { podcastId } }: DetailsPageProps) => {
  const { user } = useUser()
  const currentPodcast = useQuery(api.podcasts.getPodcastById, {
    podcastId
  })

  const isOwner = currentPodcast?.authorId === user?.id

  if (!currentPodcast) return <LoadingSpinner />

  return (
    <section className="bg-secondary text-secondary-foreground px-4 py-9 sm:px-8">
      <div className="flex items-center justify-between">
        <h6 className="scroll-m-20 text-xl font-semibold">Currently Playing</h6>
        <div className="flex items-center gap-2">
          <Image
            src="/icons/headphone.svg"
            alt="headphone"
            width={24}
            height={24}
            className="h-[24px] w-[24px]"
          />
          <p>{currentPodcast?.views}</p>
        </div>
      </div>
      <PodcastDetailPlayer
        isOwner={isOwner}
        {...currentPodcast}
        podcastId={currentPodcast._id}
      />
      <div className="mt-6 font-bold">Description:</div>
      <p className="font-light leading-7">
        {currentPodcast?.podcastDescription}
      </p>
      <div className="mt-6 font-bold">Transcription:</div>
      <p className="font-light leading-7">{currentPodcast?.voicePrompt}</p>
      <div className="mt-6 font-bold">Thumbnail prompt:</div>
      <p className="text-muted-foreground font-light leading-7">
        /* Functionality to be added */
      </p>
      <PodcastList
        renderTitle={() => (
          <h6 className="text-xl font-semibold">Similar Podcasts</h6>
        )}
        label="similar"
        queryParams={{ podcastId }}
        renderEmptyState={() => (
          <EmptyState
            title="No results found"
            subtitle="There are no similar podcasts to this one."
          >
            <div className="mt-5 flex items-center justify-center">
              <Button className="w-full max-w-[300px]" asChild>
                <Link href={'/create-podcast'}>
                  <Image
                    src={'/icons/microphone.svg'}
                    alt="microphone"
                    width={24}
                    height={24}
                    className="mr-2 h-[`24px] w-[24px]"
                  />
                  Create a Podcast
                </Link>
              </Button>
            </div>
          </EmptyState>
        )}
      />
    </section>
  )
}

export default DetailsPage
