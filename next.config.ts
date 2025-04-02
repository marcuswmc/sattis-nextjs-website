import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/cancel/:slug',
        destination: '/cancel/:slug',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;