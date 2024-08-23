import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { BellRing, CalendarDays, Check, ChevronRight } from 'lucide-react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@clerk/nextjs'
import { plans } from '@/constants'

const CurrentUserPlan = ({ userId }: { userId: string }) => {
  const { user } = useUser()
  const currentPlan = useQuery(api.plans.getPlansByUserId, {
    userId
  })
  const fallback = getFirstTwoLetters(user?.firstName || '')

  function getFirstTwoLetters(str: string) {
    return str.substring(0, 2).toUpperCase()
  }

  if (!user || !userId || user.id !== userId || !currentPlan) {
    return null
  }

  const descriptionPlan = plans.find(
    (plan) => plan.title.toLocaleLowerCase() === currentPlan.name
  )?.description

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="ml-auto flex items-center font-semibold"
        >
          User Plan Info{' '}
          <ChevronRight className="ml-2 h-4 w-4 rotate-90 opacity-70" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold capitalize">
              {currentPlan.name + ' Plan'}
            </h4>
            <p className="text-sm">{descriptionPlan}</p>
            <ul className="ml-5 text-sm">
              <li>Tokens remaining: {currentPlan.tokens}</li>
            </ul>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-muted-foreground text-xs">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default CurrentUserPlan
