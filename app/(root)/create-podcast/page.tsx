'use client'

import GeneratePodcast from '@/components/GeneratePodcast'
import GenerateThumbnail from '@/components/GenerateThumbnail'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { voiceCategories } from '@/constants'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction, useMutation } from 'convex/react'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.'
  })
})

const CreatePage = () => {
  const { toast } = useToast()
  const router = useRouter()
  const createPodcast = useMutation(api.podcasts.createPodcast)
  const createBlurHash = useAction(api.blurhash.encodeImageToBlurhash)

  const [imagePrompt, setImagePrompt] = useState('')
  const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(
    null
  )
  const [imageUrl, setImageUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(
    null
  )
  const [audioDuration, setAudioDuration] = useState(0)
  const [voiceType, setVoiceType] = useState('')
  const [voicePrompt, setVoicePrompt] = useState('')
  const [transcription, setTranscription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: '',
      description: ''
    }
  })

  function handleCreateErrorPodcast(error: unknown) {
    setIsSubmitting(false)
    toast({
      variant: 'destructive',
      title: 'Error creating podcast'
    })
  }

  function validateStateValues() {
    if (!voiceType) {
      toast({ title: 'Missing voice type', variant: 'destructive' })
      throw new Error('Missing voice type')
    }
    if (!imageUrl || !audioUrl) {
      toast({ title: 'Missing image or audio url', variant: 'destructive' })
      throw new Error('Missing image or audio url')
    }
  }

  function handleCreateSuccessPodcast() {
    setIsSubmitting(false)
    toast({ title: 'Podcast created' })
    router.push('/')
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    validateStateValues()
    setIsSubmitting(true)

    try {
      const blurhash = await createBlurHash({ imageUrl })
      await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.description,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId,
        imageStorageId,
        transcription,
        blurhash
      })
      handleCreateSuccessPodcast()
    } catch (error) {
      handleCreateErrorPodcast(error)
    }
  }

  return (
    <section className="bg-secondary text-secondary-foreground px-4 py-9 sm:px-8">
      <h6 className="scroll-m-20 text-xl font-semibold">Create a Podcast</h6>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex w-full flex-col gap-7"
        >
          <FormField
            control={form.control}
            name="podcastTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Podcast title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Create a creative podcast title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Select AI Voice</FormLabel>
            <FormControl>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger
                  className="text-muted-foreground capitalize"
                  aria-label="Select voice"
                >
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {voiceCategories.map(({ voice: category }) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
            {voiceType && (
              <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
            )}
          </FormItem>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Write a short description about the podcast"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="bg-background" />
          <GeneratePodcast
            setAudioStorageId={setAudioStorageId}
            setAudio={setAudioUrl}
            voiceType={voiceType!}
            audio={audioUrl}
            voicePrompt={voicePrompt}
            setVoicePrompt={setVoicePrompt}
            setAudioDuration={setAudioDuration}
            setTranscription={setTranscription}
            transcription={transcription}
          />
          <GenerateThumbnail
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            imagePrompt={imagePrompt}
            setImageStorageId={setImageStorageId}
            setImagePrompt={setImagePrompt}
          />
          <Button
            className="w-full"
            aria-label="Submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                Submitting
                <Loader size={20} className="ml-2 animate-spin" />
              </>
            ) : (
              'Submit & Publish Podcast'
            )}
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default CreatePage
