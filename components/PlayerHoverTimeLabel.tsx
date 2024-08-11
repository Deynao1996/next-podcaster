import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { cn, formatTime } from '@/lib/utils'

const PlayerHoverTimeLabel = React.forwardRef<
  HTMLDivElement,
  { duration: number; isTimeLineHovered: boolean }
>(({ duration, isTimeLineHovered }, ref) => {
  const [currentTime, setCurrentTime] = useState(0)

  function handleMouseMove(e: MouseEvent) {
    const hoveredValue = e.screenX / document.body.clientWidth
    setCurrentTime(hoveredValue * duration)
  }

  useEffect(() => {
    if (isTimeLineHovered) {
      document.addEventListener('mousemove', handleMouseMove)
      return () => document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isTimeLineHovered])

  return (
    <Card
      className={cn('absolute -top-1/3 z-20 p-1 px-2 text-white opacity-0', {
        'opacity-100': isTimeLineHovered
      })}
      ref={ref}
    >
      {formatTime(currentTime)}
    </Card>
  )
})

export default React.memo(PlayerHoverTimeLabel)
