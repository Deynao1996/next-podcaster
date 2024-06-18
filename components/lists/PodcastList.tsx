import React from 'react'
import PodcastBox from '../PodcastBox'

//TODO Add hover effect

type PodcastListProps = {
  renderTitle: () => React.ReactNode
}

const PodcastList = ({ renderTitle }: PodcastListProps) => {
  return (
    <div className="pt-9">
      {renderTitle()}
      <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <PodcastBox key={index} />
        ))}
      </ul>
    </div>
  )
}

export default PodcastList
