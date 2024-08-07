'use client'

import EmptyState from '@/components/EmptyState'
import PodcastList from '@/components/lists/PodcastList'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/convex/_generated/api'
import { useAudio } from '@/providers/AudioProvider'
import { AudioProps } from '@/types'
import { useQuery } from 'convex/react'
import { Play, Square, User } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'

const ProfilePage = ({
  params: { userId }
}: {
  params: { userId: string }
}) => {
  const { toast } = useToast()
  const currentUser = useQuery(api.users.getUserById, {
    clerkId: userId
  })
  const randomPodcast = useQuery(api.podcasts.getRandomPodcastByUserId, {
    userId
  })
  const { setAudio, isPlaying, audio } = useAudio()

  if (!currentUser) return <LoadingSpinner />

  function handlePlayRandomPodcast() {
    if (!randomPodcast) {
      return toast({
        title: 'No podcast found',
        description: 'User has not uploaded any podcast yet.'
      })
    }

    if (isPlaying && audio) {
      setAudio(null)
    } else {
      setAudio({
        audioUrl: randomPodcast.audioUrl,
        podcastId: randomPodcast._id,
        author: randomPodcast.author,
        title: randomPodcast.podcastTitle,
        imageUrl: randomPodcast.imageUrl
      })
    }
  }

  return (
    <section className="bg-secondary text-secondary-foreground px-4 py-9 sm:px-8">
      <h6 className="scroll-m-20 text-xl font-semibold">Podcaster Profile</h6>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row">
        <div className="relative aspect-square h-[250px]">
          {currentUser.imageUrl ? (
            <Image
              src={currentUser.imageUrl}
              alt="profile"
              fill
              className="rounded-sm object-cover"
            />
          ) : (
            <div className="border-muted-foreground rounded-md border p-2">
              <User className="h-full w-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between py-4">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-1">
              <Image
                src="/icons/verified.svg"
                alt="player"
                width={16}
                height={16}
                className="h-[16px] w-[16px]"
              />
              <p className="text-muted-foreground text-sm">Verified Creator</p>
            </div>
            <h6 className="text-2xl font-bold">{currentUser.name}</h6>
            <div className="flex items-center gap-1">
              <Image
                src="/icons/headphone.svg"
                alt="headphone"
                width={16}
                height={16}
                className="mr-2 h-[16px] w-[16px]"
              />
              <span className="font-semibold">450,228</span>
              <p className="font-light">monthly listeners</p>
            </div>
          </div>
          <Button
            size={'lg'}
            className="mt-4 gap-2 font-semibold"
            onClick={handlePlayRandomPodcast}
          >
            {isPlaying && !!audio ? (
              <>
                <Square className="h-5 w-5 fill-white" />
                <p>Stop playing</p>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <p>Play a random podcast</p>
              </>
            )}
          </Button>
        </div>
      </div>
      <PodcastList
        label="user"
        queryParams={{ userId: currentUser.clerkId }}
        renderEmptyState={() => (
          <EmptyState title="User doesn't create any podcasts yet" />
        )}
        renderTitle={() => (
          <div className="flex items-center justify-between">
            <h6 className="scroll-m-20 text-xl font-semibold">User Podcasts</h6>
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

export default ProfilePage
