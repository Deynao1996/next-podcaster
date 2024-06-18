import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

type LatestPodcastProps = {
  i: number
}

const LatestPodcast = ({ i }: LatestPodcastProps) => {
  return (
    <li className="flex items-center justify-between gap-3">
      <div className="basis-2.5">
        <span>{i + 1}</span>
      </div>
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/player1.png"
            alt="podcast"
            width={50}
            height={54}
            className="h-[54px] w-[50px] rounded-sm"
          />
          <p>Joe Rogan</p>
        </div>
        <div className="flex w-1/2 justify-between">
          <div className="hidden items-center gap-2 sm:flex">
            <Image
              src={'/icons/headphone.svg'}
              alt="headphone"
              width={20}
              height={20}
              className="object-cover"
            />
            <p className="text-sm">450,228</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={'/icons/watch.svg'}
              alt="timer"
              width={24}
              height={24}
            />
            <p className="text-sm">1:04:27</p>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="secondary"
              aria-label="options"
              className="hover:bg-background origin-center transition-all duration-200"
              size="icon"
            >
              <Image
                src={'/icons/three-dots.svg'}
                alt="dots"
                className="w-auto rotate-90"
                width={22}
                height={24}
              />
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LatestPodcast
