// src/middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  // Protect cart route
  if (request.nextUrl.pathname.startsWith('/cart')) {
    console.log('Checking cart access, token exists:', !!token)
    if (!token) {
      console.log('Redirecting to login')
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  
  // Allow all other routes
  return NextResponse.next()
}
 
// PROTECT CART ROUTES
export const config = {
  matcher: '/cart/:path*'
}
