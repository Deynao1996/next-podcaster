import EmptyState from '@/components/EmptyState'
import PodcastList from '@/components/lists/PodcastList'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfilePage = () => {
  return (
    <section className="bg-secondary text-secondary-foreground px-4 py-9 sm:px-8">
      <h6 className="scroll-m-20 text-xl font-semibold">Podcaster Profile</h6>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row">
        <div className="relative aspect-square h-[250px]">
          <Image
            src="/images/bg-img.png"
            alt="profile"
            fill
            className="rounded-sm object-cover"
          />
        </div>
        <div className="flex flex-col justify-between py-4">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-1">
              <Image
                src="/icons/verified.svg"
                alt="player"
                width={16}
                height={16}
                className="h-[16px] w-[16px]"
              />
              <p className="text-muted-foreground text-sm">Verified Creator</p>
            </div>
            <h6 className="text-2xl font-bold">Marvin James</h6>
            <div className="flex items-center gap-1">
              <Image
                src="/icons/headphone.svg"
                alt="headphone"
                width={16}
                height={16}
                className="mr-2 h-[16px] w-[16px]"
              />
              <span className="font-semibold">450,228</span>
              <p className="font-light">monthly listeners</p>
            </div>
          </div>
          <Button size={'lg'} className="mt-4">
            <Image
              src="/icons/play.svg"
              alt="play"
              width={20}
              height={20}
              className="mr-2 h-[20px] w-[20px]"
            />
            Play a random podcast
          </Button>
        </div>
      </div>
      <PodcastList
        renderEmptyState={() => (
          <EmptyState title="You have not created any podcasts yet">
            <div className="mt-5 flex items-center justify-center">
              <Button className="w-full max-w-[300px]" asChild>
                <Link href={'/create-podcast'}>
                  <Image
                    src={'/icons/microphone.svg'}
                    alt="microphone"
                    width={24}
                    height={24}
                    className="mr-2 h-[`24px] w-[24px]"
                  />
                  Create a Podcast
                </Link>
              </Button>
            </div>
          </EmptyState>
        )}
        renderTitle={() => (
          <div className="flex items-center justify-between">
            <h6 className="scroll-m-20 text-xl font-semibold">All Podcasts</h6>
            <Button variant={'outline'}>
              <Image
                src="/icons/filter-lines.svg"
                className="h-4 w-4 md:mr-2"
                alt="menu"
                width={24}
                height={24}
              />
              <p className="hidden md:block">Apply filter</p>
              <div className="bg-primary text-primary-foreground ml-2 flex h-3 w-3 items-center justify-center rounded-full p-2.5 text-[0.6rem]">
                <p>1</p>
              </div>
            </Button>
          </div>
        )}
        itemsLength={8}
      />
    </section>
  )
}

export default ProfilePage
