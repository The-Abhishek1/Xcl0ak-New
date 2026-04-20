import type { NextConfig } from 'next'

const ESO_URL = process.env.ESO_API_URL ?? 'http://localhost:8000'

const nextConfig: NextConfig = {
  images: { unoptimized: true },

  experimental: {
    serverActions: {
      // Allow server actions from both local and production domains
      allowedOrigins: [
        'localhost:3000',
        'xcloak.tech',
        'www.xcloak.tech',
        'xcl0ak.netlify.app',
      ],
    },
  },

  // Proxy /api/eso/* → ESO FastAPI backend
  // Authorization header is forwarded automatically by Next.js rewrites
  async rewrites() {
    return [
      {
        source:      '/api/eso/:path*',
        destination: `${ESO_URL}/api/v1/:path*`,
      },
    ]
  },

  // Make ESO URL available server-side
  env: {
    ESO_API_URL: ESO_URL,
  },
}

export default nextConfig
