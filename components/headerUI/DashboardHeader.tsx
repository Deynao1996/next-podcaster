'use client'

import { Menu, Search } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import DashboardNavLinks from '../navLinksUI/DashboardNavLinks'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useClerk, useUser } from '@clerk/nextjs'
import { Skeleton } from '../ui/skeleton'
import { useRouter } from 'next/navigation'

const DashboardHeader = () => {
  const router = useRouter()
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    router.push('/coming-soon')
  }

  return (
    <header className="bg-background sticky top-0 z-50 flex h-16 items-center gap-4 border-b px-4 md:px-6">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <DashboardNavLinks />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 p-5 text-lg font-medium">
            <DashboardNavLinks />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form
          className="ml-auto flex-1 sm:flex-initial"
          onSubmit={handleSearch}
        >
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search podcasts..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <UserButton />
      </div>
    </header>
  )
}

const UserButton = () => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  if (!user) return <Skeleton className="size-[40px] rounded-full" />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {user.fullName?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut(() => router.push('/'))}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DashboardHeader
