import React from 'react'
import PodcastBox from '../PodcastBox'
import EmptyState from '../EmptyState'

//TODO Add hover effect

type PodcastListProps = {
  renderTitle: () => React.ReactNode
  itemsLength?: number
  renderEmptyState?: () => React.ReactNode
}

const PodcastList = ({
  renderTitle,
  renderEmptyState,
  itemsLength = 4
}: PodcastListProps) => {
  return (
    <div className="pt-9">
      {renderTitle()}
      {!itemsLength && renderEmptyState?.()}
      <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(itemsLength)].map((_, index) => (
          <PodcastBox key={index} />
        ))}
      </ul>
    </div>
  )
}

export default PodcastList
