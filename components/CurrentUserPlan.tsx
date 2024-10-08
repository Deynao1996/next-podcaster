import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import {
  CalendarPlus,
  CalendarX2,
  ChevronRight,
  Coins,
  History,
  Info
} from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@clerk/nextjs'
import { plans } from '@/constants'
import { useState } from 'react'
import { ConvexError } from 'convex/values'
import { useToast } from './ui/use-toast'
import { getFirstTwoLetters } from '@/lib/utils'

function formatDate(startTime: number, endTime: number, creationTime: number) {
  return {
    startDate: new Date(startTime),
    endDate: new Date(endTime),
    createdDate: new Date(creationTime)
  }
}

const CurrentUserPlan = ({ userId }: { userId: string }) => {
  const currentPlan = useQuery(api.plans.getPlansByUserId, {
    userId
  })
  const { user } = useUser()
  const { toast } = useToast()
  const unsubscribe = useMutation(api.plans.unsubscribePlan)
  const fallback = getFirstTwoLetters(user?.firstName || '')
  const [isLoading, setIsLoading] = useState(false)

  if (!user || !userId || user.id !== userId || !currentPlan) {
    return null
  }

  const descriptionPlan = plans.find(
    (plan) => plan.title.toLocaleLowerCase() === currentPlan.name
  )?.description
  const { startDate, endDate, createdDate } = formatDate(
    currentPlan.startTime,
    currentPlan.endTime,
    currentPlan._creationTime
  )

  async function handleUnsubscribe() {
    if (!user || !user.id) return
    setIsLoading(true)
    try {
      await unsubscribe({ userId: user.id })
      toast({
        title: 'Success',
        description: 'Unsubscribed successfully'
      })
      setIsLoading(false)
    } catch (error) {
      if (error instanceof ConvexError) {
        toast({
          title: 'Error',
          description: error.data,
          variant: 'destructive'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Something went wrong. Please try again later.'
        })
      }
      setIsLoading(false)
    }
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          size={'icon'}
          disabled={!currentPlan}
          variant={'ghost'}
          className="ml-auto h-6 w-6 rounded-full"
        >
          <Info className="h-6 w-6 text-blue-400" />
          <p className="sr-only">Current Plan</p>
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
            <ul className="ml-4 text-sm capitalize">
              <li className="flex items-center">
                <Coins className="mr-1 h-4 w-4 opacity-70" />
                Tokens remaining:{' '}
                {currentPlan.tokens > 1000 ? 'Unlimited' : currentPlan.tokens}
              </li>
              <li className="flex items-center">
                <History className="mr-1 h-4 w-4 opacity-70" />
                Interval: {currentPlan.interval}
              </li>
              <li className="flex items-center">
                <CalendarPlus className="mr-1 h-4 w-4 opacity-70" />
                Plan Start: {startDate.toLocaleDateString('en-US')}
              </li>
              {currentPlan.endTime !== 0 && (
                <li className="flex items-center">
                  <CalendarX2 className="mr-1 h-4 w-4 opacity-70" />
                  Plan End: {endDate.toLocaleDateString('en-US')}
                </li>
              )}
            </ul>
            <div className="flex items-center pt-2">
              <span className="text-muted-foreground text-xs">
                Joined {createdDate.toLocaleDateString('en-US')}
              </span>
            </div>
            {currentPlan.name !== 'free' && (
              <Button
                className="w-full"
                disabled={isLoading}
                size={'sm'}
                onClick={handleUnsubscribe}
              >
                Unsubscribe
              </Button>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default CurrentUserPlan
