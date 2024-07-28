'use client'

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import DotActionButtons from './DotActionButtons'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'

const PopularPodcastSlider = () => {
  const popularPodcasts = useQuery(api.users.getTopUserByPodcastCount)

  return (
    <Carousel
      className="mt-4"
      plugins={[
        Autoplay({
          delay: 10000
        })
      ]}
    >
      <CarouselContent>
        {popularPodcasts?.map((item) => {
          const topUserPodcast = item.podcast[0]
          return (
            topUserPodcast && (
              <CarouselItem key={item._id}>
                <div className="relative h-[300px]">
                  {item?.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt="Popular Podcast"
                      fill
                      sizes="(100vw)"
                      className="aspect-square rounded-lg object-cover"
                    />
                  )}
                  <Link
                    href={`/podcasts/${topUserPodcast.pocastId}`}
                    className="glass absolute bottom-0 flex h-1/4 w-full flex-col justify-center rounded-lg rounded-t-none px-4 transition-all duration-300 hover:bg-opacity-80"
                  >
                    <p className="font-bold">{topUserPodcast.podcastTitle}</p>
                    <span className="text-muted-foreground text-sm">
                      {item.name}
                    </span>
                  </Link>
                </div>
              </CarouselItem>
            )
          )
        })}
      </CarouselContent>
      <DotActionButtons />
    </Carousel>
  )
}

export default PopularPodcastSlider
