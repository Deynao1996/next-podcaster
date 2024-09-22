'use client'

import SearchBar from '@/components/SearchBar'
import EmptyPodcastList from '@/components/emptyStateUI/EmptyPodcastList'
import PodcastList from '@/components/lists/PodcastList'

const CreatePodcastPage = ({
  searchParams: { search }
}: {
  searchParams: { search: string }
}) => {
  return (
    <section className="bg-secondary text-secondary-foreground min-h-svh px-4 py-9 sm:px-8">
      <SearchBar href="discover" />
      <PodcastList
        label="discover"
        queryParams={{ search: search || '' }}
        renderEmptyState={() => (
          <EmptyPodcastList
            title="No results found"
            subtitle="Try adjusting your search to find what you are looking for"
          />
        )}
        renderTitle={() => (
          <div className="flex items-center justify-between">
            <h6 className="scroll-m-20 text-xl font-semibold">
              {search ? (
                <span>
                  Search results for:{' '}
                  <span className="text-muted-foreground">{search}</span>
                </span>
              ) : (
                'Discover Community Podcasts'
              )}
            </h6>
            <div></div>
          </div>
        )}
      />
    </section>
  )
}

export default CreatePodcastPage
