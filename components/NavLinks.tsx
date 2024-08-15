'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SheetClose } from './ui/sheet'

const NavLinks = ({ withSheetClose }: { withSheetClose?: boolean }) => {
  const [SheetCloseWrapper, shetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, {}]
  const { user } = useUser()
  const pathname = usePathname()
  const navLinks = sidebarLinks(user?.id)

  return (
    <div className="flex flex-col gap-3">
      {navLinks.map((link) => {
        const isActive =
          pathname === link.route || pathname.startsWith(`${link.route}/`)

        return (
          <SheetCloseWrapper {...shetCloseWrapperProps} key={link.label}>
            <Link
              key={link.label}
              href={link.route}
              className={cn(
                'relative flex h-12 cursor-pointer items-center justify-start gap-5 px-6 font-semibold leading-[50px] text-white opacity-70 transition-all duration-200 hover:opacity-100 hover:[background-color:rgba(255,255,255,0.06)] focus:[background-color:rgba(255,255,255,0.06)] sm:justify-center sm:px-0 xl:justify-start xl:pl-8 xl:pr-12',
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
              <Image
                src={link.imgURL}
                alt={`Navigation icon to ${link.label}`}
                width={23}
                height={23}
              />
              <p className="block sm:hidden xl:block">{link.label}</p>
            </Link>
          </SheetCloseWrapper>
        )
      })}
    </div>
  )
}

export default NavLinks
