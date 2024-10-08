'use client'

import CurrentUserPlan from '@/components/CurrentUserPlan'
import CustomSkeleton from '@/components/CustomSkeleton'
import EmptyPodcastList from '@/components/emptyStateUI/EmptyPodcastList'
import PodcastList from '@/components/lists/PodcastList'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import UserSettings from '@/components/UserSettings'
import { api } from '@/convex/_generated/api'
import { useAudio } from '@/providers/AudioProvider'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { Play, Square, User } from 'lucide-react'
import Image from 'next/image'

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
      <div className="flex items-center justify-between">
        <h6 className="scroll-m-20 text-xl font-semibold">Podcaster Profile</h6>
        <UserSettings userId={userId} />
      </div>
      {!currentUser ? (
        <CustomSkeleton type="profile" />
      ) : (
        <div className="mt-5 flex flex-col flex-wrap gap-5 sm:flex-row">
          <div className="relative aspect-square h-[250px]">
            {currentUser.imageUrl ? (
              <Image
                src={currentUser.imageUrl}
                alt="profile"
                fill
                className="rounded-sm object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="border-muted-foreground rounded-md border p-2">
                <User className="h-full w-full" />
              </div>
            )}
          </div>
          <div className="flex flex-col py-4">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/verified.svg"
                  alt="player"
                  width={16}
                  height={16}
                  className="size-4"
                />
                <p className="text-muted-foreground text-sm">
                  Verified Creator
                </p>
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
              className="mt-8 gap-2 font-semibold"
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
          <CurrentUserPlan userId={userId} />
        </div>
      )}
      {currentUser?.clerkId && (
        <PodcastList
          label="user"
          queryParams={{ userId: currentUser.clerkId }}
          renderEmptyState={() => (
            <EmptyPodcastList title="User doesn't create any podcasts yet" />
          )}
          renderTitle={() => (
            <div className="flex items-center justify-between">
              <h6 className="scroll-m-20 text-xl font-semibold">
                User Podcasts
              </h6>
              <div></div>
            </div>
          )}
        />
      )}
    </section>
  )
}

export default ProfilePage
