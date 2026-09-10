import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // 404 for unmatched URLs — needed because the app has two root layouts ((pl) and en)
    globalNotFound: true,
  },
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
