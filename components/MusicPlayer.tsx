import Image from 'next/image'
import React from 'react'

const MusicPlayer = () => {
  return (
    <div className="sticky bottom-0 w-full">
      <div className="bg-[#2E3036] h-1">
        <div className="h-1 bg-white w-1/2 rounded-r-3xl"></div>
      </div>
      <div className="h-[100px] glass px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3 flex-1">
          <Image
            src="/images/player1.png"
            alt="player"
            width={60}
            height={60}
            className="rounded-sm object-cover"
          />
          <div className="flex flex-col py-2 justify-center gap-1">
            <p>Joe Rogan</p>
            <span className="text-sm text-muted-foreground">Joe Rogan</span>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-1 justify-center">
          <div className="flex items-center gap-1">
            <Image
              src={'/icons/reverse.svg'}
              alt="reverse"
              width={24}
              height={24}
            />
            <p className="text-sm text-muted-foreground">-15</p>
          </div>
          <div>
            <Image
              src={'/icons/play-gray.svg'}
              alt="play"
              width={55}
              height={55}
            />
          </div>
          <div className="flex items-center gap-1">
            <Image
              src={'/icons/reverse.svg'}
              alt="reverse"
              width={24}
              height={24}
              className="rotate-180"
            />
            <p className="text-sm text-muted-foreground">15+</p>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-1 justify-end">
          <span className="text-muted-foreground">1:45/4:42</span>
          <div className="flex items-center gap-3">
            <Image
              src={'/icons/mute.svg'}
              alt="volume"
              width={24}
              height={24}
            />
            <div className="w-[90px] h-1 bg-[#2E3036] rounded-md">
              <div className="w-1/4 h-1 bg-white rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
