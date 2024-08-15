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
  const popularPodcast = useQuery(api.podcasts.getPopularPodcastByUserId, {
    userId
  })
  const { setAudio, isPlaying, audio } = useAudio()

  if (!currentUser) return <LoadingSpinner />

  function handlePlayRandomPodcast() {
    if (!popularPodcast) {
      return toast({
        title: 'No podcast found',
        description: 'User has not uploaded any podcast yet.'
      })
    }

    if (isPlaying && audio) {
      setAudio(null)
    } else {
      setAudio({
        audioUrl: popularPodcast.audioUrl,
        podcastId: popularPodcast._id,
        author: popularPodcast.author,
        title: popularPodcast.podcastTitle,
        imageUrl: popularPodcast.imageUrl
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
              sizes="(max-width: 768px) 100px, 400px"
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
                className="size-4"
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
                className="mr-2 size-4"
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
                <p>Play a popular podcast</p>
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
            <div></div>
          </div>
        )}
      />
    </section>
  )
}

export default ProfilePage
