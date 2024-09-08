'use client'

import React from 'react'
import Logo from './Logo'
import NavLinks from './navLinksUI/NavLinks'
import { Button } from './ui/button'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'

const LeftSideBar = () => {
  const { signOut } = useClerk()
  const pathname = usePathname()
  const router = useRouter()
  const isDiscoverPage = pathname.startsWith('/discover')
  const isHomePage = pathname === '/'

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
      {(isDiscoverPage || isHomePage) && (
        <div className="p-6">
          <SignedIn>
            <Button
              className="w-full font-bold"
              onClick={() => signOut(() => router.push('/'))}
            >
              <LogInIcon className="block h-4 w-4 xl:hidden" />
              <span className="hidden xl:block">Logout</span>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button className="w-full font-bold" asChild>
              <Link href={'/sign-in'}>
                <LogInIcon className="block h-4 w-4 xl:hidden" />
                <span className="hidden xl:block">Login</span>
              </Link>
            </Button>
          </SignedOut>
        </div>
      )}
    </div>
  )
}

export default LeftSideBar
