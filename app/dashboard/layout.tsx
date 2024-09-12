import DashboardHeader from '@/components/headerUI/DashboardHeader'
import { DASHBOARD_PERMISSION } from '@/constants'
import { Protect } from '@clerk/nextjs'

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Protect permission={DASHBOARD_PERMISSION} fallback={'/404'}>
        <DashboardHeader />
        {children}
      </Protect>
    </div>
  )
}
