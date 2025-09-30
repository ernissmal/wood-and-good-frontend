import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    optimizeCss: true,
  },
  // Ensure CSS is properly processed
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Headers are handled by Cloudflare Pages instead of Next.js for static export
};

export default nextConfig;
