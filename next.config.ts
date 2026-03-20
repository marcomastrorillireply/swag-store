import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
