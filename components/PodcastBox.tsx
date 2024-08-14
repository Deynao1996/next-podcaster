import { blurHashToDataURL } from '@/lib/blurhash'
import { PodcastBoxProps } from '@/types'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PodcastBox = ({
  imageUrl,
  podcastDescription,
  podcastTitle,
  _id,
  blurhash
}: PodcastBoxProps) => {
  const blurDataUrl = blurHashToDataURL(blurhash)

  return (
    <li className="rounded-xl p-1 transition-all hover:[background-color:rgba(255,255,255,0.06)]">
      <Link href={`/podcasts/${_id}`}>
        <div className="relative aspect-auto h-64 overflow-hidden rounded-lg lg:aspect-square lg:h-auto">
          <Image
            src={imageUrl}
            alt="podcast"
            fill
            placeholder="blur"
            blurDataURL={blurDataUrl}
            className="object-cover"
            sizes="400px"
          />
          <ExternalLink className="text-primary absolute right-2 top-2 opacity-0 transition-all duration-200 group-hover:opacity-90" />
        </div>
        <p className="mt-2 truncate font-semibold capitalize">{podcastTitle}</p>
        <span className="text-muted-foreground mt-1 line-clamp-2 text-sm font-medium leading-5">
          {podcastDescription}
        </span>
      </Link>
    </li>
  )
}

export default PodcastBox
