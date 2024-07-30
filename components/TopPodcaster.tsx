import { TopPodcasterProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopPodcaster = ({
  imageUrl,
  totalPodcasts,
  name,
  clerkId,
  totalViews
}: TopPodcasterProps) => {
  return (
    <li className="px-8 hover:[background-color:rgba(255,255,255,0.06)]">
      <Link
        href={`/profile/${clerkId}`}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="player"
              width={44}
              height={44}
              className="h-[44px] w-[44px] rounded-sm object-cover"
            />
          )}
          <div className="flex flex-col py-1">
            <p className="capitalize">{name}</p>
            <span className="text-muted-foreground text-sm">
              {totalViews} Total Views
            </span>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          {totalPodcasts} {totalPodcasts === 1 ? 'Podcast' : 'Podcasts'}
        </div>
      </Link>
    </li>
  )
}

export default TopPodcaster
