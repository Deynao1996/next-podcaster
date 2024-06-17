import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const PopularPodcastList = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="scroll-m-20 text-xl font-semibold">Fans Also Like</h4>
        <Button asChild variant="link">
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
            className="aspect-square object-cover rounded-lg"
          />
          <div className="absolute bottom-0 h-1/4 w-full glass flex flex-col justify-center px-4 rounded-lg">
            <p>Waveform</p>
            <span className="text-sm text-muted-foreground">Joe Rogan</span>
          </div>
        </li>
      </ul>

      <ul className="flex justify-center items-center mt-3 gap-2">
        {[...Array(4)].map((_, index) => {
          const isActive = index === 0
          return (
            <li
              key={index}
              className={cn('w-2 h-2 bg-white rounded-full cursor-pointer', {
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
