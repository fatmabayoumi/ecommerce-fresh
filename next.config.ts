const nextConfig = {
  reactStrictMode: true,
  // Force disable all turbopack features
  experimental: {
    webpackBuildWorker: true,
    turbopack: false
  },
  // Use webpack
  webpack: (config: any) => config,
}

module.exports = nextConfig