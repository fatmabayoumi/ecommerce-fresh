// src/proxy.ts (NEW NAME)
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  // Only protect cart
  if (request.nextUrl.pathname.startsWith('/cart')) {
    if (!token) {
      // Redirect to login
      const loginUrl = new URL('/auth/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}
 
export const config = {
  matcher: '/cart/:path*'
}
