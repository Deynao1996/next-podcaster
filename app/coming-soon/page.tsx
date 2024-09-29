'use client'

import { Button } from '@/components/ui/button'
import { Coffee, Home, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ComingSoonPage = () => {
  const router = useRouter()

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center text-gray-100">
      <div className="container flex flex-col items-center space-y-8 px-4 py-8 text-center md:px-6">
        <div className="rounded-full bg-yellow-400 p-4 shadow-lg">
          <Coffee className="h-8 w-8 text-gray-900" />
        </div>
        <div className="space-y-2">
          <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text py-3 text-4xl font-extrabold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Coming Soon!
          </h1>
          <p className="text-xl font-semibold text-gray-400 md:text-2xl">
            Our developer is furiously typing...
          </p>
        </div>
        <div className="max-w-[600px] rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-xl">
          <p className="text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I'm brewing up something amazing! I am working harder than a
            caffeinated squirrel to bring you an incredible experience. In the
            meantime, why not grab a coffee and imagine how awesome this page
            will be?
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-2 min-[400px]:flex-row">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            <Undo2 className="mr-2 h-4 w-4" />
            Go Backward
          </Button>
        </div>
      </div>
      <footer className="w-full py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Our Awesome Company. All rights reserved.
        <br />
        No developers were harmed in the making of this page. Just caffeinated.
      </footer>
    </div>
  )
}

export default ComingSoonPage
