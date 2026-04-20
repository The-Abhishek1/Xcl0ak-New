import type { NextConfig } from 'next'

const ESO_URL    = process.env.ESO_API_URL    ?? 'http://localhost:8000'
const ESO_WS_URL = process.env.ESO_WS_URL     ?? process.env.NEXT_PUBLIC_ESO_WS_URL ?? 'ws://localhost:8000'

const nextConfig: NextConfig = {
  images: { unoptimized: true },

  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'xcloak.tech',
        'www.xcloak.tech',
        'xcl0ak.netlify.app',
      ],
    },
  },

  // Proxy /api/eso/* → ESO FastAPI backend (HTTP only — WS goes directly)
  async rewrites() {
    return [
      {
        source:      '/api/eso/:path*',
        destination: `${ESO_URL}/api/v1/:path*`,
      },
    ]
  },

  // Expose to both server and client components
  env: {
    ESO_API_URL:               ESO_URL,
    ESO_WS_URL:                ESO_WS_URL,
    NEXT_PUBLIC_ESO_API_URL:   ESO_URL,
    NEXT_PUBLIC_ESO_WS_URL:    ESO_WS_URL,
  },
}

export default nextConfig
