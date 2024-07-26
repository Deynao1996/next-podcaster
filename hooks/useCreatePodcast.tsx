import { useToast } from '@/components/ui/use-toast'
import { api } from '@/convex/_generated/api'
import { GeneratePodcastProps } from '@/types'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useAction, useMutation } from 'convex/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const useCreatePodcast = ({
  setAudio,
  voicePrompt,
  voiceType,
  setAudioStorageId
}: GeneratePodcastProps) => {
  const generatePodcast = useAction(api.playht.generateAudioAction)
  const getAudioUrl = useMutation(api.podcasts.getUrl)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl)

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
      const res = await generatePodcast({
        voice: voiceType,
        input: voicePrompt
      })

      const blob = new Blob([res], { type: 'audio/mpeg' })
      const fileName = `podcast-${uuidv4()}.mp3`
      const file = new File([blob], fileName, { type: 'audio/mpeg' })

      const uploaded = await startUpload([file])
      const storageId = (uploaded[0].response as any).storageId

      setAudioStorageId(storageId)

      const audioUrl = await getAudioUrl({ storageId })
      setAudio(audioUrl!)
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
