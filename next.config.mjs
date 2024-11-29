/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "portfolio-server.finaltry-innovations.site",
        port: "",
        pathname: "/uploads/**", // Match all images under /uploads
      },
    ],
  },
};

export default nextConfig;
