import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { PodcastDetailPlayerProps } from '@/types'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import { useMutation } from 'convex/react'
import Link from 'next/link'
import { api } from '@/convex/_generated/api'
import { useAudio } from '@/providers/AudioProvider'
import { Loader, Play, Square } from 'lucide-react'
import { blurHashToDataURL } from '@/lib/blurhash'

const PodcastDetailPlayer = ({
  audioUrl,
  podcastTitle,
  author,
  imageUrl,
  podcastId,
  imageStorageId,
  audioStorageId,
  isOwner,
  authorImageUrl,
  authorId,
  blurhash
}: PodcastDetailPlayerProps) => {
  const router = useRouter()
  const blurDataUrl = blurHashToDataURL(blurhash)
  const { setAudio, isPlaying, audio } = useAudio()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const deletePodcast = useMutation(api.podcasts.deletePodcast)

  function handleDeleteSuccess() {
    setAudio(null)
    setIsDeleting(false)
    toast({
      title: 'Podcast deleted'
    })
    router.push('/')
  }

  function handleDeleteError(error: unknown) {
    setIsDeleting(false)
    console.error('Error deleting podcast', error)
    toast({
      title: 'Error deleting podcast',
      variant: 'destructive'
    })
  }

  async function handleDelete() {
    if (!imageStorageId || !audioStorageId) return
    try {
      setIsDeleting(true)
      await deletePodcast({ podcastId, imageStorageId, audioStorageId })
      handleDeleteSuccess()
    } catch (error) {
      handleDeleteError(error)
    }
  }

  function handlePlay() {
    if (isPlaying && audio) {
      setAudio(null)
    } else {
      setAudio({
        title: podcastTitle,
        audioUrl,
        imageUrl,
        author,
        podcastId
      })
    }
  }

  if (!imageUrl || !authorImageUrl) return

  return (
    <div className="mt-8 flex flex-wrap justify-between gap-8">
      <Image
        src={imageUrl}
        alt="player"
        placeholder="blur"
        blurDataURL={blurDataUrl}
        width={250}
        height={250}
        className="aspect-square h-[250px] flex-1 rounded-sm object-cover"
      />
      <div className="flex min-w-[240px] flex-[3] flex-col sm:py-3">
        <div>
          <h6 className="text-2xl font-bold capitalize">{podcastTitle}</h6>
          <Link
            className="mt-2 flex items-center gap-3"
            href={`/profile/${authorId}`}
          >
            <Image
              src={authorImageUrl}
              alt="Podcast Creator"
              width={30}
              height={30}
              className="h-[30px] w-[30px] rounded-full object-cover"
            />
            <p className="text-muted-foreground text-sm">{author}</p>
          </Link>
          <div className="mt-2 flex items-center gap-3"></div>
        </div>
        {isDeleting ? (
          <Button disabled className="mt-4 max-w-56 font-semibold" size={'sm'}>
            Deleting
            <Loader size={20} className="ml-2 animate-spin" />
          </Button>
        ) : (
          <Button
            size={'sm'}
            className="mt-4 max-w-56 gap-2 font-semibold"
            onClick={handlePlay}
          >
            {isPlaying && !!audio ? (
              <>
                <Square className="h-5 w-5 fill-white" />
                <p>Stop playing</p>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <p>Play podcast</p>
              </>
            )}
          </Button>
        )}
      </div>
      <div className="flex items-start justify-end">
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={'/icons/three-dots.svg'}
                alt="options"
                width={24}
                height={24}
                className="size-6"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer gap-3"
                onClick={handleDelete}
              >
                <Image
                  src={'/icons/delete.svg'}
                  alt="delete"
                  width={16}
                  height={16}
                  className="size-4"
                />
                <p>Delete</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default PodcastDetailPlayer
