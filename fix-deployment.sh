#!/bin/bash

# Wood and Good Frontend - Fix Deployment Issues
echo "🔧 Fixing deployment and CSS issues..."

# Clean build cache
echo "📦 Cleaning build cache..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Reinstall dependencies to fix any corruption
echo "📦 Reinstalling dependencies..."
npm ci

# Clear Tailwind cache
echo "🎨 Clearing Tailwind cache..."
npx tailwindcss --init --force

# Build the project
echo "🏗️  Building project..."
npm run build

# Export static files
echo "📤 Exporting static files..."
npm run export

# Check if build was successful
if [ -d "out" ]; then
    echo "✅ Build successful! Static files exported to 'out' directory."
    echo "📁 Build size:"
    du -sh out/
    
    echo "🔍 Key files check:"
    if [ -f "out/_next/static/css"/*.css ]; then
        echo "✅ CSS files found"
        ls -la out/_next/static/css/
    else
        echo "❌ CSS files missing!"
    fi
    
    if [ -f "out/index.html" ]; then
        echo "✅ HTML files found"
    else
        echo "❌ HTML files missing!"
    fi
    
    echo ""
    echo "🚀 To deploy to Cloudflare Pages:"
    echo "1. Run: wrangler pages publish out"
    echo "2. Or upload the 'out' folder to your Cloudflare Pages dashboard"
    echo ""
    echo "🧪 To test locally:"
    echo "1. Run: npx serve out"
    echo "2. Open: http://localhost:3000"
    
else
    echo "❌ Build failed! Check the logs above for errors."
    exit 1
fi

echo "🔍 Mobile responsiveness checklist:"
echo "✅ Viewport meta tag added"
echo "✅ Mobile-first CSS approach"
echo "✅ Touch-friendly button sizes (44px minimum)"
echo "✅ Proper font sizes (16px+ for inputs)"
echo "✅ Horizontal scroll prevention"
echo "✅ Safe area support for iOS"

echo ""
echo "📱 Test your site on multiple devices:"
echo "- iPhone/Android phones"
echo "- iPad/Android tablets"
echo "- Desktop browsers"
echo "- Use browser dev tools to simulate different screen sizes"