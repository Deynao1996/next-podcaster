import React from 'react'
import { Settings, User } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import UserSettingsContent from './UserSettingsContent'

const UserSettings = ({ userId }: { userId: string }) => {
  const { user } = useUser()
  const isNotOwner = !user || !userId || user.id !== userId

  if (isNotOwner) {
    return null
  }

  const currentUser = useQuery(api.users.getUserById, {
    clerkId: userId
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} className="size-6" variant={'ghost'}>
          <Settings className="h-6 w-6" />
          <p className="sr-only">Settings</p>
        </Button>
      </DialogTrigger>
      {currentUser && !isNotOwner && (
        <UserSettingsContent
          email={currentUser.email}
          name={currentUser.name}
          imageUrl={currentUser.imageUrl}
          clerkId={currentUser.clerkId}
        />
      )}
    </Dialog>
  )
}

export default UserSettings
