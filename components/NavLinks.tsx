'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <ul className="flex flex-col gap-3">
      {sidebarLinks.map((link) => {
        const isActive =
          pathname === link.route || pathname.startsWith(`${link.route}/`)

        return (
          <li
            key={link.label}
            className={cn(
              'relative flex cursor-pointer items-center justify-start px-6 leading-[50px] opacity-70 transition-all duration-200 hover:opacity-100 hover:[background-color:rgba(255,255,255,0.06)] sm:justify-center sm:px-0 xl:justify-start xl:pl-8 xl:pr-12',
              {
                'bg-nav-focus opacity-100': isActive
              }
            )}
          >
            {isActive && (
              <Image
                src="/icons/active-indicator.svg"
                alt="chevron"
                width={6}
                height={48}
                className="absolute right-0"
              />
            )}

            <Link
              href={link.route}
              className="flex h-12 items-center gap-5 font-semibold text-white"
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={23}
                height={23}
              />
              <p className="block sm:hidden xl:block">{link.label}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavLinks
