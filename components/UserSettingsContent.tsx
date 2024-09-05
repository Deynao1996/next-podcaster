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
import { Label } from './ui/label'
import { User } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import { UserSettingsContentProps } from '@/types'
import { ChangeEvent, useState } from 'react'
import UserAvatarUploader from './imageUploaderUI/UserAvatarUploader'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ConvexError } from 'convex/values'
import { useToast } from './ui/use-toast'

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
  const { toast } = useToast()
  const updateUser = useMutation(api.users.updateUserSettings)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      email
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // const file = files[0]
    //   const blob = await file.arrayBuffer().then((buffer) => {
    //     return new Blob([buffer])
    //   })
    //   handleImage(blob, file.name)
    try {
      await updateUser({
        blurhash: '213',
        clerkId,
        email: data.email,
        imageUrl: '3'
      })
    } catch (error) {
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
          <UserAvatarUploader imageUrl={imageUrl} />
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

const ImagePreview = () => {}

export default UserSettingsContent
