'use client'

import { dashboardLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const DashboardNavLinks = () => {
  const pathname = usePathname()

  function renderLinks(link: { label: string; route: string }) {
    const isActive =
      pathname === link.route || pathname.startsWith(`${link.route}/`)
    return (
      <Link
        key={link.label}
        href={link.route}
        className={cn(
          'text-foreground hover:text-foreground transition-colors',
          {
            'text-muted-foreground': !isActive
          }
        )}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={24}
          height={24}
          className="size-6"
        />
        <span className="sr-only">Podcaster AI</span>
      </Link>
      {dashboardLinks.map(renderLinks)}
    </>
  )
}

export default DashboardNavLinks
