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
import { voiceCategories } from '@/constants'
import { Id } from '@/convex/_generated/dataModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: '',
      description: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
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
                <SelectTrigger className="text-muted-foreground capitalize">
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
          />
          <GenerateThumbnail />
          <Button className="w-full" aria-label="Submit">
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
