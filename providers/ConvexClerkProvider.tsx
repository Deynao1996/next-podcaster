'use client'

import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
)

const ConvexClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      appearance={{
        layout: {
          socialButtonsVariant: 'iconButton',
          logoImageUrl: '/icons/auth-logo.svg'
        },
        variables: {
          colorBackground: '#09090B',
          colorPrimary: '#DC2626',
          colorText: 'white',
          colorInputBackground: '#262626',
          colorInputText: 'white'
        }
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClerkProvider
