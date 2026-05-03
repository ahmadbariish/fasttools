import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = new Set(['en', 'ar'])

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.webmanifest'
  ) {
    return NextResponse.next()
  }

  if (pathname.includes('.')) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return NextResponse.next()
  }

  const first = segments[0]
  if (locales.has(first)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  const rest = segments.slice(1).join('/')
  url.pathname = rest ? `/en/${rest}` : '/en'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
}
