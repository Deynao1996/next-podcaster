import React from 'react'
import { Settings } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  email: z
    .string()
    .min(2, { message: 'This field has to be filled.' })
    .email('This is not a valid email.')
})

const UserSettings = ({ userId }: { userId: string }) => {
  const { user } = useUser()

  if (!user || !userId || user.id !== userId) {
    return null
  }

  const currentUser = useQuery(api.users.getUserById, {
    clerkId: userId
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || ''
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} className="size-6" variant={'ghost'}>
          <Settings className="h-6 w-6" />
          <p className="sr-only">Settings</p>
        </Button>
      </DialogTrigger>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Avatar
                <Input type="file" className="hidden" />
                <div className="border-input h-20 w-full border"></div>
              </Label>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UserSettings
