import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: true,
  },
  // Ensure CSS is properly processed
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Skip problematic routes during static generation
  generateBuildId: async () => {
    return 'wood-and-good-build'
  },
};

export default nextConfig;
