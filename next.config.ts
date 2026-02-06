
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Remove or comment out the 'experimental.turbopack' line */
  // experimental: {
  //   turbopack: true,  // ← Remove this line
  // },
  
  // Keep other settings you might have:
  images: {
    domains: ['ecommerce.routemisr.com'], // or your image domains
  },
};

export default nextConfig;
