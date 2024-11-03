/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'api.portfolio.finaltry-innovations.site',
        pathname: '/uploads/**', // Allows images from /uploads folder
      },
    ],
  },
};

export default nextConfig;
