import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { UserSettingsContentProps } from '@/types'
import { useState } from 'react'
import UserAvatarUploader from './imageUploaderUI/UserAvatarUploader'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ConvexError } from 'convex/values'
import { useToast } from './ui/use-toast'
import { useUploadImage } from '@/hooks/useUploadImage'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  email: z
    .string()
    .min(2, { message: 'This field has to be filled.' })
    .email('This is not a valid email.')
})

const UserSettingsContent = ({
  email,
  name,
  imageUrl,
  clerkId
}: UserSettingsContentProps) => {
  const { handleImage, isLoading } = useUploadImage()
  const [selectedImage, setSelectedImage] = useState<File | undefined>()
  const { toast } = useToast()

  const createBlurHash = useAction(api.blurhash.encodeImageToBlurhash)
  const updateUser = useMutation(api.users.updateUserSettings)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      email
    }
  })

  function handleError(error: unknown) {
    if (error instanceof ConvexError) {
      toast({
        title: error.data,
        variant: 'destructive'
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong. Please try again later.'
      })
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!selectedImage) return toast({ title: 'Please select an image.' })
    const blob = await selectedImage.arrayBuffer().then((buffer) => {
      return new Blob([buffer])
    })
    try {
      const imageUrl = await handleImage(blob, selectedImage.name)
      if (!imageUrl)
        return toast({
          title: 'Error uploading image.',
          variant: 'destructive'
        })

      const blurhash = await createBlurHash({ imageUrl })
      await updateUser({
        blurhash,
        clerkId,
        email: data.email,
        imageUrl
      })
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="grid gap-4 pt-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel className="text-right">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="col-span-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-3 text-right" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel className="text-right">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="col-span-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-3 text-right" />
              </FormItem>
            )}
          />
          <UserAvatarUploader
            imageUrl={imageUrl}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default UserSettingsContent
