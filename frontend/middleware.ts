import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Fix CORS issues for development
  const origin = request.headers.get('origin')

  // Allow requests from these origins (both local and production)
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://172.17.96.1:3000',
    'https://manggad-thesis-repo.vercel.app',
    'https://lozjisjwxdyagrmyqmiv.supabase.co'
  ]

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  // Set secure cookie settings
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-forwarded-host', request.headers.get('host') || 'localhost:3000')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}