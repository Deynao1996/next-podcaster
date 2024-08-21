'use client'

import ConfirmPaymentAlert from '@/components/ConfirmPaymentAlert'
import LatestPodcastList from '@/components/lists/LatestPodcastList'
import PodcastList from '@/components/lists/PodcastList'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useConsumeQueryParam } from '@/hooks/useConsumeQueryParam'
import { useQuery } from 'convex/react'
import React from 'react'

const HomePage = () => {
  const paymentId = useConsumeQueryParam('paymentId')
  const sentMessageId = useQuery(api.payments.getMessageByPaymentId, {
    paymentId: (paymentId ?? undefined) as Id<'payments'> | undefined
  })

  return (
    <main className="bg-secondary text-secondary-foreground px-4 pb-9 sm:px-8">
      <PodcastList
        label="trending"
        renderTitle={() => (
          <h1 className="scroll-m-20 text-xl font-semibold">
            Trending Podcasts
          </h1>
        )}
      />
      <LatestPodcastList
        renderTitle={() => (
          <h2 className="scroll-m-20 text-xl font-semibold">Latest Podcasts</h2>
        )}
      />
      <PodcastList
        label="trending"
        renderTitle={() => (
          <h3 className="scroll-m-20 text-xl font-semibold">
            Popular Podcasts
          </h3>
        )}
      />
      <ConfirmPaymentAlert message={sentMessageId} />
    </main>
  )
}

export default HomePage
