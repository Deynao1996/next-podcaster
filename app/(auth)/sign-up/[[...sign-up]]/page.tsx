import { Card } from '@/components/ui/card'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <Card className="w-[90%] max-w-sm">
      <SignUp />
    </Card>
  )
}

export default SignUpPage
