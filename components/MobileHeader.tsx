import React from 'react'
import Logo from './Logo'
import Image from 'next/image'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet'
import NavLinks from './NavLinks'

const MobileHeader = () => {
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
          <div className="flex items-center gap-3 p-6">
            <Image src="/icons/logo.svg" alt="logo" width={25} height={32} />
            <p className="scroll-m-20 text-xl font-semibold tracking-tight">
              Podcaster
            </p>
          </div>
          <NavLinks />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default MobileHeader
