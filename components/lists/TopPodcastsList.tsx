import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import TopPodcaster from '../TopPodcaster'

const TopPodcastsList = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-8">
        <h5 className="scroll-m-20 text-xl font-semibold">Top Podcasters</h5>
        <Button asChild variant="link" className="p-0">
          <Link href={'/'}>See all</Link>
        </Button>
      </div>
      <ul className="mt-5 space-y-3">
        {[...Array(4)].map((_, index) => (
          <TopPodcaster key={index} />
        ))}
      </ul>
    </div>
  )
}

export default TopPodcastsList
