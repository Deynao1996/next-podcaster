import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Slider } from '../ui/slider'

const VolumeControl = ({
  audioRef
}: {
  audioRef: React.RefObject<HTMLAudioElement>
}) => {
  const [isMuted, setIsMuted] = useState(false)
  const [audioVolume, setAudioVolume] = useState(1)

  function toggleMute() {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted((prev) => !prev)

      if (isMuted) {
        setAudioVolume(1)
      } else {
        setAudioVolume(0)
      }
    }
  }

  function handleChange(value: number[]) {
    if (audioRef.current) {
      setAudioVolume(value[0])
      audioRef.current.volume = value[0]
      if (value[0] === 0) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
        audioRef.current.muted = false
      }
    }
  }

  return (
    <div className="hidden items-center gap-3 sm:flex">
      <Image
        src={isMuted ? '/icons/unmute.svg' : '/icons/mute.svg'}
        alt="volume"
        onClick={toggleMute}
        width={24}
        height={24}
        className="cursor-pointer transition-opacity hover:opacity-65"
      />
      <Slider
        className="w-[90px] cursor-pointer"
        defaultValue={[1]}
        max={1}
        step={0.1}
        value={[audioVolume]}
        onValueChange={handleChange}
      />
    </div>
  )
}

export default React.memo(VolumeControl)
