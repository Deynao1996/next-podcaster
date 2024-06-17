import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import PopularPodcastList from './lists/PopularPodcastList'
import TopPodcastsList from './lists/TopPodcastsList'

const RightSideBar = () => {
  return (
    <section className="py-9 px-8 sticky top-0 left-0">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <Image
            src="/images/player1.png"
            alt="user"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="font-semibold">Marvin James</p>
        </div>
        <Link href={'/'}>
          <Image
            src={'/icons/right-arrow.svg'}
            alt="dots"
            width={22}
            height={24}
          />
        </Link>
      </div>
      <PopularPodcastList />
      <div className="mt-10">
        <TopPodcastsList />
      </div>
    </section>
  )
}

export default RightSideBar
