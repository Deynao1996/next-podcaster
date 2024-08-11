'use client'

import { cn, formatTime } from '@/lib/utils'
import { useAudio } from '@/providers/AudioProvider'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Progress } from './ui/progress'
import { usePathname } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import VolumeControl from './VolumeControl'
import { createPortal } from 'react-dom'
import { Card } from './ui/card'
import PlayerHoverTimeLabel from './PlayerHoverTimeLabel'

const MusicPlayer = () => {
  const pathName = usePathname()
  const audioRef = useRef<HTMLAudioElement>(null)
  const hoverTimeRef = useRef<HTMLDivElement>(null)
  const increaseViews = useMutation(api.podcasts.increaseViews)

  const { audio, setAudio, isPlaying, setIsPlaying } = useAudio()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isTimeLineHovered, setIsTimeLineHovered] = useState(false)

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

  function moveTimeBoxByX(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (hoverTimeRef.current) {
      const isLeftPartScreen = e.screenX > document.body.clientWidth / 6
      const boxWidth = hoverTimeRef.current.clientWidth
      const transformedValue = isLeftPartScreen
        ? e.screenX - boxWidth
        : e.screenX
      hoverTimeRef.current.style.left = `${transformedValue}px`
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

  function handleSkipValue(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (audioRef.current) {
      const onClickedValue = (e.screenX / document.body.clientWidth) * 100
      const difference = onClickedValue - playerValue
      const skippedValue = (difference * duration) / 100
      audioRef.current!.currentTime += skippedValue
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
        onClick={handleSkipValue}
        value={playerValue}
        onMouseMove={moveTimeBoxByX}
        onMouseEnter={() => setIsTimeLineHovered(true)}
        onMouseLeave={() => setIsTimeLineHovered(false)}
        className="z-10 h-1 cursor-pointer rounded-none bg-[#2E3036]"
        max={duration}
      />
      <PlayerHoverTimeLabel
        ref={hoverTimeRef}
        duration={duration}
        isTimeLineHovered={isTimeLineHovered}
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
          <VolumeControl audioRef={audioRef} />
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
