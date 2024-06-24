import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import PopularPodcastList from './lists/PopularPodcastList'
import TopPodcastsList from './lists/TopPodcastsList'

const RightSideBar = () => {
  return (
    <section className="sticky left-0 top-0 py-9">
      <Link
        href="/"
        className="link-hover-effect mb-10 flex items-center justify-between px-8 py-1 hover:[background-color:rgba(255,255,255,0.06)]"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/images/player1.png"
            alt="user"
            width={50}
            height={50}
            className="h-[50px] w-[50px] rounded-full"
          />
          <p className="font-semibold">Marvin James</p>
        </div>
        <Image
          src={'/icons/right-arrow.svg'}
          alt="dots"
          width={22}
          height={24}
          className="h-[24px] w-[22px]"
        />
      </Link>
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
