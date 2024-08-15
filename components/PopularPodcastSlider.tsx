'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import DotActionButtons from './DotActionButtons'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import LoadingSpinner from './LoadingSpinner'
import { PopularPodcastProps } from '@/types'

const PopularPodcastSlider = ({
  popularPodcasts
}: {
  popularPodcasts: PopularPodcastProps[]
}) => {
  return (
    <Carousel
      className="mt-4"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 10000
        })
      ]}
    >
      <CarouselContent>
        {popularPodcasts.map((item) => {
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
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
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
