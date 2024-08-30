import React, { useCallback } from 'react'
import { useCarousel } from '../ui/carousel'
import { DotButton, useDotButton } from './CarouserDotButton'
import { EmblaCarouselType } from 'embla-carousel'

const DotActionButtons = () => {
  const { api } = useCarousel()

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay || !('stopOnInteraction' in autoplay.options)) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as () => void)
        : (autoplay.stop as () => void)

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    api,
    onNavButtonClick
  )

  return (
    <div className="mt-3 flex items-center justify-center gap-2">
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onDotButtonClick(index)}
          selected={selectedIndex === index}
        />
      ))}
    </div>
  )
}

export default DotActionButtons
