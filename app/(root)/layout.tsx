import LeftSideBar from '@/components/LeftSideBar'
import MobileHeader from '@/components/MobileHeader'
import MusicPlayer from '@/components/MusicPlayer'
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
        <div className="hidden w-fit sm:block">
          <LeftSideBar />
        </div>
        <div className="flex-1">{children}</div>
        <div className="hidden lg:block lg:w-[370px]">
          <RightSideBar />
        </div>
      </div>
      <MusicPlayer />
    </div>
  )
}
