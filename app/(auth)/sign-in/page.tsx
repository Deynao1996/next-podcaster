import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SignInPage = () => {
  return (
    <Card className="w-[90%] max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={25}
            height={32}
            className="h-[32px] w-[25px]"
          />
          <p className="scroll-m-20 text-2xl font-bold tracking-tight">
            Podcaster
          </p>
        </CardTitle>
        <CardDescription>to continue to Podcaster</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant={'outline'}
            size={'icon'}
            aria-label="Login with google"
          >
            <Image
              src="/icons/google.svg"
              alt="google"
              width={20}
              height={20}
              className="h-[20px] w-[20px]"
            />
          </Button>
          <Button
            variant={'outline'}
            size={'icon'}
            aria-label="Login with github"
          >
            <Image
              src="/icons/github.svg"
              alt="github"
              width={20}
              height={20}
            />
          </Button>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
      <CardFooter className="items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <p className="text-secondary-foreground">No account?</p>
          <Button variant={'link'} asChild className="p-0">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
        <ul className="flex gap-4">
          <li>
            <Button
              variant={'link'}
              asChild
              className="text-muted-foreground p-0"
            >
              <Link href="/sign-up">Help</Link>
            </Button>
          </li>
          <li>
            <Button
              variant={'link'}
              asChild
              className="text-muted-foreground p-0"
            >
              <Link href="/sign-up">Privacy</Link>
            </Button>
          </li>
        </ul>
      </CardFooter>
    </Card>
  )
}

export default SignInPage
