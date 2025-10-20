import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
    ],
},
    async rewrites() {
    		return [
    			{
    				source: '/api/c15t/:path*',
    				destination: `${process.env.NEXT_PUBLIC_C15T_URL}/:path*`,
    			},
    		];
    	}
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
