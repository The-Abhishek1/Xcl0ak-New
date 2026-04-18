// next.config.ts
// FIXED: Added /api/eso/* → ESO FastAPI proxy rewrite
// Without this, eso-api.ts calls to /api/eso/... return 404

import type { NextConfig } from 'next'

const ESO_URL = process.env.ESO_API_URL ?? 'http://localhost:8000'

const nextConfig: NextConfig = {
  images: { unoptimized: true },

  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },

  // Proxy /api/eso/* → ESO FastAPI backend
  // This is what eso-api.ts depends on for all scan/auth calls
  async rewrites() {
    return [
      {
        source:      '/api/eso/:path*',
        destination: `${ESO_URL}/api/v1/:path*`,
      },
    ]
  },

  // Expose ESO URL to server components
  env: {
    ESO_API_URL: ESO_URL,
  },
}

export default nextConfig
