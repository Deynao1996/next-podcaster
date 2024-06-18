import Image from 'next/image'
import React from 'react'

const MusicPlayer = () => {
  return (
    <div className="sticky bottom-0 w-full">
      <div className="h-1 bg-[#2E3036]">
        <div className="h-1 w-1/2 rounded-r-3xl bg-white"></div>
      </div>
      <div className="glass flex h-[70px] items-center justify-between px-6 py-6 sm:h-[100px] sm:px-12">
        <div className="flex flex-1 items-center gap-3">
          <Image
            src="/images/player1.png"
            alt="player"
            width={60}
            height={60}
            className="hidden h-[px60] w-[60px] rounded-sm object-cover sm:block"
          />
          <div className="flex flex-col justify-center gap-1 py-2">
            <p>Joe Rogan</p>
            <span className="text-muted-foreground text-sm">Joe Rogan</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-6">
          <div className="hidden items-center gap-1 sm:flex">
            <Image
              src={'/icons/reverse.svg'}
              alt="reverse"
              width={24}
              height={24}
            />
            <p className="text-muted-foreground text-sm">-15</p>
          </div>
          <div>
            <Image
              src={'/icons/play-gray.svg'}
              alt="play"
              width={55}
              height={55}
              className="h-[40px] w-[40px] sm:h-[55px] sm:w-[55px]"
            />
          </div>
          <div className="hidden items-center gap-1 sm:flex">
            <Image
              src={'/icons/reverse.svg'}
              alt="reverse"
              width={24}
              height={24}
              className="rotate-180"
            />
            <p className="text-muted-foreground text-sm">15+</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-6">
          <span className="text-muted-foreground">1:45/4:42</span>
          <div className="hidden items-center gap-3 sm:flex">
            <Image
              src={'/icons/mute.svg'}
              alt="volume"
              width={24}
              height={24}
            />
            <div className="h-1 w-[90px] rounded-md bg-[#2E3036]">
              <div className="h-1 w-1/4 rounded-md bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
