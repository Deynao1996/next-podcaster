import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])
const isAdminRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req)) {
    auth().protect((has) => {
      return has({ permission: 'org:dashboard:view' })
    })
  }

  if (!isPublicRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
