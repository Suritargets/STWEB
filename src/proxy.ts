import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin routes: never run intl middleware, just auth-check
  if (pathname.startsWith('/admin')) {
    if (pathname !== '/admin/login') {
      const session = request.cookies.get('admin_session')?.value
      if (!session || session.length !== 64) {
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('from', pathname)
        return NextResponse.redirect(loginUrl)
      }
    }
    return NextResponse.next()
  }

  // All other routes: apply i18n locale routing
  return intlMiddleware(request)
}

export const config = {
  // Exclude api, _next, _vercel, static files AND admin from this middleware
  // but keep admin included so auth check runs
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
