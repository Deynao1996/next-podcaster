import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PodcastBox = () => {
  return (
    <li className="rounded-md">
      <Link href={'/'}>
        <div className="relative aspect-auto h-64 lg:aspect-square lg:h-auto">
          <Image
            src="/images/bg-img.png"
            alt="podcast"
            fill
            priority
            className="rounded-md object-cover"
            sizes="(100vw)"
          />
        </div>
        <p className="mt-2 truncate font-semibold">Joe Rogan</p>
        <span className="text-muted-foreground mt-1 truncate text-sm font-medium leading-none">
          Joe Rogan
        </span>
      </Link>
    </li>
  )
}

export default PodcastBox
