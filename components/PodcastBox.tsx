import { PodcastBoxProps } from '@/types'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

//TODO Check description overflow
//TODO Check console warnings

const PodcastBox = ({
  imageUrl,
  podcastDescription,
  podcastTitle,
  _id
}: PodcastBoxProps) => {
  function handleIncreaseViews() {}

  return (
    <li className="rounded-md">
      <Link
        href={`/podcasts/${_id}`}
        className="group"
        onClick={handleIncreaseViews}
      >
        <div className="relative aspect-auto h-64 overflow-hidden rounded-lg group-hover:shadow-lg lg:aspect-square lg:h-auto">
          <Image
            src={imageUrl}
            alt="podcast"
            fill
            priority
            className="object-cover transition-all duration-1000 group-hover:rotate-2 group-hover:scale-110"
            sizes="(100vw)"
          />
          <ExternalLink className="text-primary absolute right-2 top-2 opacity-0 transition-all duration-200 group-hover:opacity-90" />
        </div>
        <p className="mt-2 truncate font-semibold">{podcastTitle}</p>
        <span className="text-muted-foreground mt-1 line-clamp-2 text-sm font-medium leading-5">
          {podcastDescription}
        </span>
      </Link>
    </li>
  )
}

export default PodcastBox
