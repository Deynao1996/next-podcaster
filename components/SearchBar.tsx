import { useDebounce } from '@/hooks/useDebounce'
import { SearchBarProps } from '@/types'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchBar = ({ href }: SearchBarProps) => {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const debouncedValue = useDebounce(search, 500)

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/${href}?search=${debouncedValue}`)
    } else if (!debouncedValue && pathname === `/${href}`) {
      router.push(`/${href}`)
    }
  }, [router, debouncedValue, pathname])

  return (
    <div className="w-full">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring block w-full rounded-md border py-3 pl-10 pr-5 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Type here to search"
          required
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onLoad={() => setSearch('')}
        />
      </div>
    </div>
  )
}

export default SearchBar
