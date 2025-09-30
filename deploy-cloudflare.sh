#!/bin/bash

# Wood and Good Frontend - Cloudflare Pages Deployment
echo "🚀 Building Wood and Good for Cloudflare Pages..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🏗️  Building project..."
npm run build

# Check if out directory exists
if [ -d "out" ]; then
    echo "✅ Build successful! Static files in 'out' directory:"
    ls -la out/ | head -10
    
    # Check for CSS files
    echo "🔍 Checking for CSS files..."
    find out -name "*.css" -type f | head -5
    
    echo ""
    echo "🎨 CSS files found:"
    find out -path "*/_next/static/css/*" -name "*.css" -exec ls -la {} \;
    
    echo ""
    echo "📊 Build size:"
    du -sh out/
    
    echo ""
    echo "✅ Ready for Cloudflare Pages deployment!"
    echo "📁 Deploy the 'out' directory to Cloudflare Pages"
    
else
    echo "❌ Build failed - no 'out' directory found"
    echo "Attempting fallback build..."
    
    # Fallback: try building without static export
    echo "output: 'standalone'," > temp-config.js
    cat next.config.ts | sed 's/output: .export.,/output: "standalone",/' > temp-next.config.ts
    mv temp-next.config.ts next.config.ts
    
    npm run build
    
    if [ -d ".next" ]; then
        echo "⚠️  Fallback build created .next directory"
        echo "You may need to use a different deployment method"
    fi
fi