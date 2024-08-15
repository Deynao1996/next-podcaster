import React from 'react'
import { SignIn } from '@clerk/nextjs'
import { Card } from '@/components/ui/card'

const SignInPage = () => {
  return (
    <Card className="w-[90%] max-w-sm">
      <SignIn />
    </Card>
  )
}

export default SignInPage
