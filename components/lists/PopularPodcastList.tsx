import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const PopularPodcastList = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold">Fans Also Like</h4>
        <Button asChild variant="link" className="p-0">
          <Link href={'/'}>See all</Link>
        </Button>
      </div>
      <ul className="mt-4">
        <li className="relative h-[300px]">
          <Image
            src="/images/bg-img.png"
            alt="Popular Podcast"
            fill
            sizes="(100vw)"
            className="aspect-square rounded-lg object-cover"
          />
          <div className="glass absolute bottom-0 flex h-1/4 w-full flex-col justify-center rounded-lg px-4">
            <p>Waveform</p>
            <span className="text-muted-foreground text-sm">Joe Rogan</span>
          </div>
        </li>
      </ul>

      <ul className="mt-3 flex items-center justify-center gap-2">
        {[...Array(4)].map((_, index) => {
          const isActive = index === 0
          return (
            <li
              key={index}
              className={cn('h-2 w-2 cursor-pointer rounded-full bg-white', {
                'opacity-40': !isActive
              })}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default PopularPodcastList
