import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

type LatestPodcastProps = {
  i: number
}

const LatestPodcast = ({ i }: LatestPodcastProps) => {
  return (
    <li className="flex justify-between items-center gap-3">
      <div className="basis-2.5">
        <span>{i + 1}</span>
      </div>
      <div className="flex-1 flex justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/player1.png"
            alt="podcast"
            width={50}
            height={54}
            className="rounded-sm"
          />
          <p>Joe Rogan</p>
        </div>
        <div className="flex justify-between w-1/2">
          <div className="flex items-center gap-2">
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
              className="origin-center transition-all duration-200 hover:bg-background"
              size="icon"
            >
              <Image
                src={'/icons/three-dots.svg'}
                alt="dots"
                className="rotate-90"
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
