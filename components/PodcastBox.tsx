import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PodcastBox = () => {
  return (
    <li className="rounded-md">
      <Link href={'/'}>
        <div className="relative aspect-square">
          <Image
            src="/images/bg-img.png"
            alt="podcast"
            fill
            priority
            className="rounded-md object-cover"
            sizes="(100vw)"
          />
        </div>
        <p className="font-semibold mt-2 truncate">Joe Rogan</p>
        <span className="mt-1 text-muted-foreground text-sm font-medium leading-none truncate">
          Joe Rogan
        </span>
      </Link>
    </li>
  )
}

export default PodcastBox
