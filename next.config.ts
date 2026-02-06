// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Replace domains with remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/**',
      },
      // Add other image domains you need here
    ],
  },
};

export default nextConfig;
