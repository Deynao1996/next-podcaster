import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { LatestPodcastProps } from '@/types'
import { formatTime } from '@/lib/utils'
import Link from 'next/link'
import {
  Calendar,
  Pause,
  Play,
  PlayCircle,
  Square,
  StopCircle,
  Timer
} from 'lucide-react'
import { useAudio } from '@/providers/AudioProvider'

const LatestPodcast = ({
  i,
  audioDuration,
  author,
  imageUrl,
  podcastTitle,
  views,
  _id,
  _creationTime,
  audioUrl
}: LatestPodcastProps) => {
  const { audio, setAudio, isPlaying, setIsPlaying } = useAudio()
  const isCurrentPodcastPlaying = audio?.podcastId === _id && isPlaying

  function togglePlay() {
    if (isCurrentPodcastPlaying) {
      setAudio(null)
    } else {
      setAudio({
        title: podcastTitle,
        audioUrl,
        imageUrl,
        author,
        podcastId: _id
      })
      setIsPlaying(true)
    }
  }

  return (
    <li className="relative flex items-center justify-between gap-3">
      <div className="basis-2.5">
        <span>{i + 1}</span>
      </div>
      <div className="flex flex-1 justify-between">
        <Link
          href={`/podcasts/${_id}`}
          className="group flex items-center gap-4"
        >
          <Image
            src={imageUrl}
            alt="podcast"
            width={50}
            height={54}
            className="h-[54px] w-[50px] rounded-sm object-cover"
          />
          <div className="flex flex-col justify-center">
            <span className="truncate font-semibold">{podcastTitle}</span>
            <p className="text-muted-foreground text-sm">{author}</p>
          </div>
          <div className="pointer-events-none absolute h-full w-full focus-visible:[background-color:rgba(255,255,255,0.06)] group-hover:[background-color:rgba(255,255,255,0.06)]" />
        </Link>
        <div className="flex w-1/2 justify-between">
          <div className="hidden items-center gap-2 sm:flex">
            <Image
              src={'/icons/headphone.svg'}
              alt="headphone"
              width={20}
              height={20}
              className="object-cover"
            />
            <p className="text-sm">{views}</p>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            <p className="text-sm">{formatTime(audioDuration)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <p className="text-sm">
              {new Date(_creationTime).toLocaleDateString('en-US')}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="secondary"
              aria-label={isCurrentPodcastPlaying ? 'Pause' : 'Play'}
              className="hover:bg-background origin-center transition-all duration-200"
              size="icon"
              onClick={togglePlay}
            >
              {isCurrentPodcastPlaying ? (
                <Square className="h-5 w-5 fill-white" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LatestPodcast
