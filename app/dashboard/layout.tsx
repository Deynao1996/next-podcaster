import DashboardHeader from '@/components/headerUI/DashboardHeader'

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      {children}
    </div>
  )
}
