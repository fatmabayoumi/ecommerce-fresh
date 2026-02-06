"use client"

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function NextauthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Log route changes for debugging (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Route changed to: ${pathname}`);
    }
  }, [pathname]);

  return (
    <SessionProvider 
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  )
}