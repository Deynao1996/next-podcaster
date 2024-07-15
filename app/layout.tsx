import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { ConvexClientProvider } from '@/providers/ConvexProvider'
import './globals.css'

const inter = Manrope({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  )
}
