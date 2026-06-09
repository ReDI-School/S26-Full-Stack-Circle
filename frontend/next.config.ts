import type { NextConfig } from 'next';

const API_URL = process.env.API_URL || 'http://localhost:4000';

const nextConfig: NextConfig = {
  turbopack: {
    root: './',
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
