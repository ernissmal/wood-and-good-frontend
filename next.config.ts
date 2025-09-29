import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages configuration - use default Next.js build
  trailingSlash: true,
  
  // Image optimization for Cloudflare
  images: {
    unoptimized: true,
  },
  
  // Disable ESLint during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript build errors for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_CMS_URL: process.env.NEXT_PUBLIC_CMS_URL,
  }
};

export default nextConfig;
