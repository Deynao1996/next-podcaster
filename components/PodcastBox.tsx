import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PodcastBox = () => {
  return (
    <li className="rounded-md">
      <Link href={'/'} className="group">
        <div className="relative aspect-auto h-64 overflow-hidden rounded-md group-hover:shadow-lg lg:aspect-square lg:h-auto">
          <Image
            src="/images/bg-img.png"
            alt="podcast"
            fill
            priority
            className="object-cover transition-all duration-1000 group-hover:rotate-2 group-hover:scale-110"
            sizes="(100vw)"
          />
          <ExternalLink className="text-primary absolute right-2 top-2 opacity-0 transition-all duration-200 group-hover:opacity-90" />
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
