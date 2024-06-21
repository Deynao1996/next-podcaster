import PodcastList from '@/components/lists/PodcastList'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import React from 'react'

//TODO Check all aria labels
//TODO Check Image warnings

const DetailsPage = () => {
  return (
    <section className="bg-secondary text-secondary-foreground px-4 py-9 sm:px-8">
      <div className="flex items-center justify-between">
        <h6 className="scroll-m-20 text-xl font-semibold">Currently Playing</h6>
        <div className="flex items-center gap-2">
          <Image
            src="/icons/headphone.svg"
            alt="headphone"
            width={24}
            height={24}
            className="h-[24px] w-[24px]"
          />
          <p>110,537</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-8">
        <Image
          src="/images/bg-img.png"
          alt="player"
          width={250}
          height={250}
          className="h-[250px] flex-1 rounded-sm object-cover"
        />
        <div className="flex min-w-[240px] flex-[3] flex-col justify-between sm:py-3">
          <div>
            <h6 className="text-2xl font-bold">JavaScript Jungle</h6>
            <div className="mt-2 flex items-center gap-3">
              <Image
                src="/images/player1.png"
                alt="Podcast Creator"
                width={30}
                height={30}
                className="h-[30px] w-[30px] rounded-full object-cover"
              />
              <p className="text-muted-foreground text-sm">Cristopher Solits</p>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-2">
            <Button variant={'link'} size={'icon'}>
              <Image
                src={'/icons/reverse.svg'}
                alt="reverse"
                width={24}
                height={24}
                className="h-[24px] w-[24px]"
              />
            </Button>
            <Button variant={'link'} className="p-0">
              <Image
                src={'/icons/play-gray.svg'}
                alt="play"
                width={60}
                height={60}
                className="h-[60px] w-[60px]"
              />
            </Button>
            <Button variant={'link'} size={'icon'}>
              <Image
                src={'/icons/reverse.svg'}
                alt="reverse"
                width={24}
                height={24}
                className="h-[24px] w-[24px] rotate-180"
              />
            </Button>
          </div>
          <div className="mt-5 flex flex-col gap-1 px-2">
            <span className="text-muted-foreground">1:45/4:42</span>
            <div className="h-1 bg-[#2E3036]">
              <div className="h-1 w-1/2 rounded-3xl bg-white"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-start justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={'/icons/three-dots.svg'}
                alt="options"
                width={24}
                height={24}
                className="h-[24px] w-[24px]"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="gap-3">
                <Image
                  src={'/icons/edit.svg'}
                  alt="edit"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                <p>Edit</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3">
                <Image
                  src={'/icons/delete.svg'}
                  alt="delete"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                <p>Delete</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p className="mt-8 font-light leading-7">
        Welcome to the "Javascript Jungle Podcast"! Join us as we navigate
        through the dense and ever-evolving world of JavaScript. Whether you're
        a seasoned developer or just starting your journey, our podcast has
        something for everyone.
      </p>
      <div className="my-6 font-bold">Transcription</div>
      <div className="my-2">Introduction:</div>
      <p className="font-light leading-7">
        Welcome to JavaScript Jungle, your go-to podcast for all things
        JavaScript! In today's episode, we're diving deep into the fascinating
        world of JavaScript and exploring some of the most interesting aspects
        of this powerful programming language.
      </p>
      <div className="my-4">Segment 1: Unraveling JavaScript's Secrets</div>
      <p className="font-light leading-7">
        JavaScript has evolved significantly since its inception. From its
        humble beginnings as a language for enhancing web pages with interactive
        elements, it has grown into a powerhouse for both frontend and backend
        development. One of the most intriguing aspects of JavaScript is its
        versatility. It can be used for everything from building dynamic
        websites and web applications to developing server-side applications
        with Node.js.\
      </p>
      <div className="my-6 font-bold">Thumbnail Prompt</div>
      <p className="font-light leading-7">
        Welcome to JavaScript Jungle, your go-to podcast for all things
        JavaScript! In today's episode, we're diving deep into the fascinating
        world of JavaScript and exploring some of the most interesting aspects
        of this powerful programming language.
      </p>
      <PodcastList
        renderTitle={() => (
          <h6 className="text-xl font-semibold">Similar Podcasts</h6>
        )}
        itemsLength={4}
      />
    </section>
  )
}

export default DetailsPage
