'use client'

import EmptyState from '@/components/EmptyState'
import SearchBar from '@/components/SearchBar'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { ExternalLink, Headphones, Loader, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const PodcastersPage = ({
  searchParams: { search }
}: {
  searchParams: { search: string }
}) => {
  const users = useQuery(api.users.getTopUserByPodcastCount, {
    search: search || ''
  })

  return (
    <section className="bg-secondary text-secondary-foreground px-4 py-9 sm:px-8">
      <SearchBar href="discover/podcasters" />
      <h6 className="mt-9 text-xl font-semibold">
        {search ? (
          <span>
            Search results for:{' '}
            <span className="text-muted-foreground">{search}</span>
          </span>
        ) : (
          <p>Top Podcasters</p>
        )}
      </h6>
      {users?.length === 0 && (
        <EmptyState
          title="No results found"
          subtitle="Try adjusting your search to find what you are looking for"
        />
      )}
      {!users ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader className="text-primary animate-spin" size={40} />
        </div>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {users.map((user) => (
            <li className="rounded-md" key={user.clerkId}>
              <Link href={`/profile/${user.clerkId}`} className="group">
                <div className="relative aspect-auto h-64 overflow-hidden rounded-lg group-hover:shadow-lg lg:aspect-square lg:h-auto">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt="podcast"
                      fill
                      priority
                      className="object-cover transition-all duration-1000 group-hover:rotate-2 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="border-muted-foreground rounded-md border p-2">
                      <User className="h-full w-full" />
                    </div>
                  )}
                  <ExternalLink className="text-primary absolute right-2 top-2 opacity-0 transition-all duration-200 group-hover:opacity-90" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="truncate font-semibold">{user.name}</p>
                  <div className="flex items-center gap-1">
                    <Headphones className="h-4 w-4" />
                    <span className="text-sm">{user.totalViews}</span>
                  </div>
                </div>
                <span className="text-muted-foreground mt-1 line-clamp-2 text-sm font-medium leading-5">
                  {user.podcast.length} Total Podcasts
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PodcastersPage
