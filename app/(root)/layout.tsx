import LeftSideBar from '@/components/LeftSideBar'
import MobileHeader from '@/components/MobileHeader'
import MusicPlayer from '@/components/MusicPlayer'
import RightSideBar from '@/components/RightSideBar'
import { Button } from '@/components/ui/button'
import { LogInIcon } from 'lucide-react'
import Link from 'next/link'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <MobileHeader />
      <div className="flex justify-between">
        <div className="relative hidden w-fit sm:block">
          <div className="sticky left-0 top-0 flex h-screen flex-col justify-between">
            <LeftSideBar />
            <div className="p-6">
              <Button className="w-full" asChild>
                <Link href={'/sign-in'}>
                  <LogInIcon className="block h-4 w-4 xl:hidden" />
                  <span className="hidden xl:block">Login</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-secondary flex-1">{children}</div>
        <div className="hidden lg:block lg:w-[370px]">
          <RightSideBar />
        </div>
      </div>
      <MusicPlayer />
    </div>
  )
}
