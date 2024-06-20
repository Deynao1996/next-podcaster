import Image from 'next/image'
import React from 'react'

const EmptyState = () => {
  return (
    <div className="mx-auto mt-5 max-w-sm sm:mt-10">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Image
          src={'/icons/emptyState.svg'}
          alt="empty-state"
          width={200}
          height={200}
        />
        <p className="text-secondary-foreground text-2xl font-semibold">
          No results found
        </p>
        <span className="text-muted-foreground">
          Try adjusting your search to find what you are looking for
        </span>
      </div>
    </div>
  )
}

export default EmptyState
