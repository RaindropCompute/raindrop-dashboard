/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5005",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api-v1.raindrop.bobbygeorge.dev",
        port: "443",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api-v1.*.raindrop.bobbygeorge.dev",
        port: "443",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
