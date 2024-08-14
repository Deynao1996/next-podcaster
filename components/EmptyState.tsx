import Image from 'next/image'
import React from 'react'

type EmptyStateProps = {
  children?: React.ReactNode
  title: string
  subtitle?: string
}

const EmptyState = ({ children, title, subtitle }: EmptyStateProps) => {
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
          {title}
        </p>
        {subtitle && <span className="text-muted-foreground">{subtitle}</span>}
      </div>
      {children}
    </div>
  )
}

export default EmptyState
