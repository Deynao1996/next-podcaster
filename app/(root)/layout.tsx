import LeftSideBar from '@/components/LeftSideBar'
import MobileHeader from '@/components/MobileHeader'
import MusicPlayer from '@/components/playerUI/MusicPlayer'
import RightSideBar from '@/components/RightSideBar'

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
