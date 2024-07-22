import { api } from '@/convex/_generated/api'
import { GeneratePodcastProps } from '@/types'
import { useAction } from 'convex/react'
import { useState } from 'react'

export const useGeneratePodcast = ({
  setAudio,
  voicePrompt,
  voiceType
}: GeneratePodcastProps) => {
  const getPodcastAudio = useAction(api.openai.generateAudioAction)
  const [isGenerating, setIsGenerating] = useState(false)

  async function generatePodcast() {
    setIsGenerating(true)
    setAudio('')

    if (!voicePrompt) {
      return setIsGenerating(false)
    }

    try {
      const res = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt
      })
      const blob = new Blob([res], { type: 'audio/mpeg' })
    } catch (error) {
      console.log('Error generating podcast:', error)
    } finally {
      setIsGenerating(false)
    }

    return {}
  }

  return {
    isGenerating,
    generatePodcast
  }
}
