import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopPodcaster = () => {
  return (
    <li className="px-8 hover:[background-color:rgba(255,255,255,0.06)]">
      <Link href={'/'} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/player1.png"
            alt="player"
            width={44}
            height={44}
            className="h-[44px] w-[44px] rounded-sm object-cover"
          />
          <div className="flex flex-col py-1">
            <p>Joe Rogan</p>
            <span className="text-muted-foreground text-sm">james</span>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">34 Podcasts</div>
      </Link>
    </li>
  )
}

export default TopPodcaster
