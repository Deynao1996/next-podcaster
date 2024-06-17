import LeftSideBar from '@/components/LeftSideBar'
import MusicPlayer from '@/components/MusicPlayer'
import RightSideBar from '@/components/RightSideBar'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-fit">
          <LeftSideBar />
        </div>
        <div className="flex-1">{children}</div>
        <div className="w-[370px]">
          <RightSideBar />
        </div>
      </div>
      <MusicPlayer />
    </div>
  )
}
