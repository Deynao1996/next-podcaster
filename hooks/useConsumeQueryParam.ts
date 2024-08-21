import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function useConsumeQueryParam(name: string) {
  const searchParams = useSearchParams()
  const value = searchParams.get(name)

  useEffect(() => {
    if (!value) return
    const currentUrl = new URL(window.location.href)
    const searchParams = currentUrl.searchParams
    searchParams.delete(name)
    const consumedUrl =
      currentUrl.origin + currentUrl.pathname + searchParams.toString()
    window.history.replaceState(null, '', consumedUrl)
  }, [])

  return value
}
