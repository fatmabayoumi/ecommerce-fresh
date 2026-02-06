// src/middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  // Protect cart route
  if (request.nextUrl.pathname.startsWith('/cart')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  
  // Allow all other routes
  return NextResponse.next()
}
 
// Only protect cart route, not others
export const config = {
  matcher: '/cart/:path*'  // This protects /cart and /cart/*
}
