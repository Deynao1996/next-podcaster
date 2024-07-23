import { api } from '@/convex/_generated/api'
import { GeneratePodcastProps } from '@/types'
import { useAction, useMutation } from 'convex/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useToast } from '@/components/ui/use-toast'

export const useGeneratePodcast = ({
  setAudio,
  voicePrompt,
  voiceType,
  setAudioStorageId
}: GeneratePodcastProps) => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const getPodcastAudio = useAction(api.openai.generateAudioAction)
  const getAudioUrl = useMutation(api.podcasts.getUrl)

  const { startUpload } = useUploadFiles(generateUploadUrl)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  function createAudioFile(res: ArrayBuffer) {
    const blob = new Blob([res], { type: 'audio/mpeg' })
    const fileName = `podcast-${uuidv4()}.mp3`
    const file = new File([blob], fileName, { type: 'audio/mpeg' })

    return file
  }

  async function uploadFile(file: File) {
    const uploadedFile = await startUpload([file])
    const storageId = (uploadedFile[0].response as any).storageId
    setAudioStorageId(storageId)
    return storageId
  }

  function failVoicePrompt() {
    toast({
      title: 'Please provide a voice type to generate a podcast'
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

  function successCreatingPodcast() {
    toast({
      title: 'Podcast created successfully'
    })
    setIsGenerating(false)
  }

  async function generatePodcast() {
    setIsGenerating(true)
    setAudio('')
    if (!voicePrompt) return failVoicePrompt()

    try {
      const res = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt
      })
      const file = createAudioFile(res)
      const storageId = await uploadFile(file)

      const audioUrl = await getAudioUrl({
        storageId
      })
      setAudio(audioUrl!)
      successCreatingPodcast()
    } catch (error) {
      failCreatingPodcast()
      console.log('Error generating podcast:', error)
    }

    return {}
  }

  return {
    isGenerating,
    generatePodcast
  }
}
