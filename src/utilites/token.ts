'use client'

import { useSession } from "next-auth/react"

export function useAuthToken(): string | null {
  const { data: session } = useSession()
  
  if (!session) return null
  
  // Safe access to token from different possible locations
  const token = 
    (session as any)?.token ||        // From session object
    (session?.user as any)?.token ||  // From user object
    null
  
  return token
}

// Optional: Function to validate token format
export function isValidToken(token: string | null): boolean {
  if (!token) return false
  if (token === 'undefined' || token === 'null') return false
  if (token.length < 10) return false // Basic length check
  return true
}