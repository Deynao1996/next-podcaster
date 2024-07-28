import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import PopularPodcastSlider from '../PopularPodcastSlider'

const PopularPodcastList = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold">Fans Also Like</h4>
        <Button asChild variant="link" className="p-0">
          <Link href={'/'}>See all</Link>
        </Button>
      </div>
      <PopularPodcastSlider />
    </div>
  )
}

export default PopularPodcastList
