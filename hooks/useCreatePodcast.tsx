import { useToast } from '@/components/ui/use-toast'
import { api } from '@/convex/_generated/api'
import { GeneratePodcastProps } from '@/types'
import { useAction } from 'convex/react'
import { useState } from 'react'

export const useCreatePodcast = ({
  setAudio,
  voicePrompt,
  voiceType
}: GeneratePodcastProps) => {
  const generatePodcast = useAction(api.playht.generateAudioAction)

  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  function failVoicePrompt() {
    toast({
      title: 'Please provide a voice type to generate a podcast'
    })
    setIsGenerating(false)
  }

  function successCreatingPodcast() {
    toast({
      title: 'Podcast created successfully'
    })
    setIsGenerating(false)
  }

  function failCreatingPodcast() {
    toast({
      title: 'Error creating podcast',
      variant: 'destructive'
    })
    setIsGenerating(false)
  }

  async function createPodcast() {
    setIsGenerating(true)
    setAudio('')
    if (!voicePrompt) return failVoicePrompt()

    try {
      const audioUrl = await generatePodcast({
        voice: voiceType,
        input: voicePrompt
      })
      setAudio(audioUrl)
      successCreatingPodcast()
    } catch (error) {
      failCreatingPodcast()
    }
  }

  return {
    isGenerating,
    createPodcast
  }
}
