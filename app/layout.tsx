import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import ConvexClerkProvider from '@/providers/ConvexClerkProvider'
import './globals.css'
import AudioProvider from '@/providers/AudioProvider'
import { Toaster } from '@/components/ui/toaster'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Podcaster',
  description: 'Create a Podcast using AI',
  icons: {
    icon: { url: '/icons/logo.svg' }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={manrope.className}>
        <ConvexClerkProvider>
          <AudioProvider>{children}</AudioProvider>
        </ConvexClerkProvider>
        <Toaster />
      </body>
    </html>
  )
}
