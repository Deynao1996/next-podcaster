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
      <ul className="grid grid-cols-4 gap-5 mt-5">
        {[...Array(4)].map((_, index) => (
          <PodcastBox key={index} />
        ))}
      </ul>
    </div>
  )
}

export default PodcastList
