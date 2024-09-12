import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { DASHBOARD_PERMISSION } from './constants'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])
const isAdminRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req)) {
    auth().protect((has) => {
      return has({ permission: DASHBOARD_PERMISSION })
    })
  }

  if (!isPublicRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
