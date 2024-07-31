'use client'

import { AudioContextType, AudioProps } from '@/types'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

const AudioContext = createContext<AudioContextType | null>(null)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<AudioProps | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/create-podcast') setAudio(null)
  }, [])

  return (
    <AudioContext.Provider value={{ audio, setAudio, isPlaying, setIsPlaying }}>
      {children}
    </AudioContext.Provider>
  )
}

export default AudioProvider
