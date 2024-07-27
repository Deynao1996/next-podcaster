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
import LoadingSpinner from './LoadingSpinner'
import Link from 'next/link'
import { api } from '@/convex/_generated/api'

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
  authorId
}: PodcastDetailPlayerProps) => {
  const router = useRouter()
  // const { setAudio } = useAudio();
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const deletePodcast = useMutation(api.podcasts.deletePodcast)

  function handleDeleteSuccess() {
    toast({
      title: 'Podcast deleted'
    })
    router.push('/')
  }

  function handleDeleteError(error: unknown) {
    console.error('Error deleting podcast', error)
    toast({
      title: 'Error deleting podcast',
      variant: 'destructive'
    })
  }

  async function handleDelete() {
    if (!imageStorageId || !audioStorageId) return
    try {
      await deletePodcast({ podcastId, imageStorageId, audioStorageId })
      handleDeleteSuccess()
    } catch (error) {
      handleDeleteError(error)
    }
  }

  function handlePlay() {
    // setAudio({
    //   title: podcastTitle,
    //   audioUrl,
    //   imageUrl,
    //   author,
    //   podcastId,
    // });
  }

  if (!imageUrl || !authorImageUrl) return <LoadingSpinner />

  return (
    <div className="mt-8 flex flex-wrap justify-between gap-8">
      <Image
        src={imageUrl}
        alt="player"
        width={250}
        height={250}
        className="h-[250px] flex-1 rounded-sm object-cover"
      />
      <div className="flex min-w-[240px] flex-[3] flex-col justify-between sm:py-3">
        <div>
          <h6 className="text-2xl font-bold">{podcastTitle}</h6>
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
            <p className="text-muted-foreground text-sm">Cristopher Solits</p>
          </Link>
          <div className="mt-2 flex items-center gap-3"></div>
        </div>
        <div className="mt-10 flex items-center gap-2">
          <Button variant={'link'} size={'icon'}>
            <Image
              src={'/icons/reverse.svg'}
              alt="reverse"
              width={24}
              height={24}
              className="h-[24px] w-[24px]"
            />
          </Button>
          <Button variant={'link'} className="p-0" onClick={handlePlay}>
            <Image
              src={'/icons/play-gray.svg'}
              alt="play"
              width={60}
              height={60}
              className="h-[60px] w-[60px]"
            />
          </Button>
          <Button variant={'link'} size={'icon'}>
            <Image
              src={'/icons/reverse.svg'}
              alt="reverse"
              width={24}
              height={24}
              className="h-[24px] w-[24px] rotate-180"
            />
          </Button>
        </div>
        <div className="mt-5 flex flex-col gap-1 px-2">
          <span className="text-muted-foreground">1:45/4:42</span>
          <div className="h-1 bg-[#2E3036]">
            <div className="h-1 w-1/2 rounded-3xl bg-white"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-end">
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={'/icons/three-dots.svg'}
                alt="options"
                width={24}
                height={24}
                className="h-[24px] w-[24px]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="gap-3">
                <Image
                  src={'/icons/edit.svg'}
                  alt="edit"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                <p>Edit</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3">
                <Image
                  src={'/icons/delete.svg'}
                  alt="delete"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
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
