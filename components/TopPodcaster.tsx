import Image from 'next/image'
import React from 'react'

const TopPodcaster = () => {
  return (
    <li className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Image
          src="/images/player1.png"
          alt="player"
          width={44}
          height={44}
          className="rounded-sm object-cover"
        />
        <div className="flex flex-col py-1">
          <p>Joe Rogan</p>
          <span className="text-sm text-muted-foreground">james</span>
        </div>
      </div>
      <div className="text-muted-foreground text-sm">34 Podcasts</div>
    </li>
  )
}

export default TopPodcaster
