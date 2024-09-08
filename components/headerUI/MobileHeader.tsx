'use client'

import React from 'react'
import Logo from '../Logo'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import NavLinks from '../navLinksUI/NavLinks'
import Link from 'next/link'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const MobileHeader = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  return (
    <Sheet>
      <div className="flex items-center justify-between p-4 sm:hidden">
        <Logo iconHeight={32} iconWidth={25} />
        <SheetTrigger asChild>
          <Button variant={'outline'} size={'icon'} aria-label="Open menu">
            <Image
              src="/icons/hamburger.svg"
              alt="menu"
              width={24}
              height={24}
            />
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side={'left'}>
        <SheetHeader>
          <div className="flex h-svh flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 p-6">
                <Image
                  src="/icons/logo.svg"
                  alt="logo"
                  width={25}
                  height={32}
                  className="h-[32px] w-[25px]"
                />
                <p className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Podcaster
                </p>
              </div>
              <NavLinks withSheetClose />
            </div>

            <div className="p-6">
              <SignedIn>
                <Button
                  className="w-full font-bold"
                  onClick={() => signOut(() => router.push('/'))}
                >
                  Logout
                </Button>
              </SignedIn>
              <SignedOut>
                <Button className="w-full font-bold" asChild>
                  <Link href={'/sign-in'}>Login</Link>
                </Button>
              </SignedOut>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default MobileHeader
