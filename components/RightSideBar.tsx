'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import PopularPodcastList from './lists/PopularPodcastList'
import TopPodcastsList from './lists/TopPodcastsList'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'

const RightSideBar = () => {
  const { user } = useUser()

  return (
    <section className="sticky left-0 top-0 py-9">
      <SignedIn>
        <Link
          href={`profile/${user?.id}`}
          className="link-hover-effect mb-10 flex items-center justify-between px-8 py-3 hover:[background-color:rgba(255,255,255,0.06)]"
        >
          <div className="flex items-center gap-3">
            <UserButton />
            <p className="font-semibold">
              {user?.firstName + ' ' + user?.lastName}
            </p>
          </div>
          <Image
            src={'/icons/right-arrow.svg'}
            alt="dots"
            width={22}
            height={24}
            className="h-[24px] w-[22px]"
          />
        </Link>
      </SignedIn>
      <div className="px-8">
        <PopularPodcastList />
      </div>
      <div className="mt-10">
        <TopPodcastsList />
      </div>
    </section>
  )
}

export default RightSideBar
