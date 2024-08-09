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
  setAudioStorageId,
  setTranscription
}: GeneratePodcastProps) => {
  const generatePodcast = useAction(api.playht.generateAudioAction)
  const generateTranscription = useAction(api.gemini.generateTranscription)
  const getAudioUrl = useMutation(api.podcasts.getUrl)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const { startUpload } = useUploadFiles(generateUploadUrl)

  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  function alertUser(title: string, isDestructive?: boolean) {
    toast({
      title,
      variant: isDestructive ? 'destructive' : 'default'
    })
    setIsGenerating(false)
  }

  async function createTranscription() {
    setIsGenerating(true)
    setTranscription('')
    if (!voicePrompt) {
      return alertUser('Please provide a text prompt to generate a podcast')
    }

    try {
      const res = await generateTranscription({
        prompt: voicePrompt
      })
      setTranscription(res)
      alertUser('Transcription created successfully')
    } catch (error) {
      alertUser('Error creating podcast', true)
    }
  }

  async function createPodcast() {
    setIsGenerating(true)
    setAudio('')
    if (!voicePrompt)
      return alertUser('Please provide a voice type to generate a podcast')

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
      alertUser('Podcast created successfully')
    } catch (error) {
      alertUser('Error creating podcast', true)
    }
  }

  return {
    isGenerating,
    createPodcast,
    createTranscription
  }
}
