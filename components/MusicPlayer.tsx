'use client'

import { cn, formatTime } from '@/lib/utils'
import { useAudio } from '@/providers/AudioProvider'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Progress } from './ui/progress'
import { usePathname } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Slider } from './ui/slider'

const MusicPlayer = () => {
  const pathName = usePathname()
  const audioRef = useRef<HTMLAudioElement>(null)
  const increaseViews = useMutation(api.podcasts.increaseViews)

  const { audio, setAudio, isPlaying, setIsPlaying } = useAudio()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  const playerValue = (currentTime / duration) * 100

  function togglePause() {
    if (audioRef.current?.paused) {
      audioRef.current?.play()
      setIsPlaying(true)
    } else {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }

  function toggleMute() {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted((prev) => !prev)
    }
  }

  function forward() {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5
    }
  }

  function rewind() {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  function handleLoadedMetadata() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  async function handleAudioEnded() {
    if (audio?.podcastId) {
      try {
        await increaseViews({
          podcastId: audio.podcastId
        })
      } catch (error) {
        console.log(error)
      }
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }

    const audioElement = audioRef.current
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateCurrentTime)

      return () => {
        audioElement.removeEventListener('timeupdate', updateCurrentTime)
      }
    }
  }, [])

  useEffect(() => {
    const audioElement = audioRef.current
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true)
        })
      }
    } else {
      audioElement?.pause()
      setIsPlaying(true)
    }
  }, [audio])

  useEffect(() => {
    if (pathName === '/create-podcast') {
      setAudio(null)
    }
  }, [pathName])

  return (
    <div
      className={cn('sticky bottom-0 w-full transition-all duration-300', {
        '-bottom-full': !audio?.audioUrl || audio?.audioUrl === ''
      })}
    >
      <Progress
        value={playerValue}
        className="h-1 rounded-none bg-[#2E3036]"
        max={duration}
      />
      <div className="glass flex h-[70px] items-center justify-between px-6 py-6 sm:h-[100px] sm:px-12">
        <audio
          ref={audioRef}
          src={audio?.audioUrl}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
        <div className="flex flex-1 items-center gap-3">
          <Image
            src={audio?.imageUrl || '/images/player1.png'}
            alt="player"
            width={60}
            height={60}
            className="hidden aspect-square w-[60px] rounded-sm object-cover sm:block"
          />
          <div className="flex flex-col justify-center gap-1 py-2">
            <p className="font-semibold">{audio?.title}</p>
            <span className="text-muted-foreground min-w-24 truncate text-sm">
              {audio?.author}
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-6">
          <div className="hidden items-center gap-1 sm:flex">
            <Image
              src={'/icons/reverse.svg'}
              alt="reverse"
              width={24}
              onClick={rewind}
              className="cursor-pointer"
              height={24}
            />
            <p className="text-muted-foreground text-sm">-5</p>
          </div>
          <div>
            <Image
              src={isPlaying ? '/icons/Pause.svg' : '/icons/Play.svg'}
              alt="play"
              width={55}
              height={55}
              className="h-[40px] w-[40px] cursor-pointer sm:h-[55px] sm:w-[55px]"
              onClick={togglePause}
            />
          </div>
          <div className="hidden items-center gap-1 sm:flex">
            <Image
              src={'/icons/reverse.svg'}
              alt="reverse"
              width={24}
              onClick={forward}
              height={24}
              className="rotate-180 cursor-pointer"
            />
            <p className="text-muted-foreground text-sm">5+</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-6">
          <span className="text-muted-foreground">{formatTime(duration)}</span>
          <div className="hidden items-center gap-3 sm:flex">
            <Image
              src={isMuted ? '/icons/unmute.svg' : '/icons/mute.svg'}
              alt="volume"
              onClick={toggleMute}
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Slider
              className="w-[90px] cursor-pointer"
              defaultValue={[33]}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
