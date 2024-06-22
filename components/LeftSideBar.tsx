'use client'

import React from 'react'
import Logo from './Logo'
import NavLinks from './NavLinks'
import { Button } from './ui/button'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

const LeftSideBar = () => {
  const pathname = usePathname()
  const isDiscoverPage = pathname.startsWith('/discover')

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="p-8">
          <Logo iconHeight={27} iconWidth={23} />
        </div>
        <div className="mt-12">
          <NavLinks />
        </div>
      </div>
      {isDiscoverPage && (
        <div className="p-6">
          <Button className="w-full" asChild>
            <Link href={'/sign-in'}>
              <LogInIcon className="block h-4 w-4 xl:hidden" />
              <span className="hidden xl:block">Login</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default LeftSideBar
