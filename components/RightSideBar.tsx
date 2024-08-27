'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import PopularPodcastList from './lists/PopularPodcastList'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import CustomSkeleton from './CustomSkeleton'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Coins, Infinity } from 'lucide-react'

const RightSideBar = () => {
  const { user } = useUser()
  const userTokens = useQuery(api.plans.getTokensByUserId, { userId: user?.id })
  const isUnlimitedPlan = userTokens && userTokens > 1000

  return (
    <section className="sticky left-0 top-0 py-9">
      <SignedIn>
        {!user ? (
          <CustomSkeleton type="user" />
        ) : (
          <Link
            href={`/profile/${user?.id}`}
            className="link-hover-effect mb-10 flex items-center justify-between px-8 py-3 hover:[background-color:rgba(255,255,255,0.06)]"
          >
            <div className="flex items-center gap-3">
              <UserButton />
              <p className="font-semibold">
                {user?.firstName + ' ' + user?.lastName}
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold">
                {isUnlimitedPlan ? (
                  <Infinity className="text-primary size-7" />
                ) : (
                  userTokens
                )}
              </span>
              {!isUnlimitedPlan && (
                <Coins className="text-primary ml-2" size={16} />
              )}
            </div>
          </Link>
        )}
      </SignedIn>
      <PopularPodcastList />
    </section>
  )
}

export default RightSideBar
