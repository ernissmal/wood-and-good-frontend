// Minimal build just for CSS testing
const path = require('path')

module.exports = {
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
  // Skip error pages that cause issues
  async generateStaticParams() {
    return []
  },
}