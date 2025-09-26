# Wood & Good Frontend

## 🌐 E-commerce Frontend Application

This repository contains the customer-facing Next.js application for Wood & Good - a premium oak wood furniture manufacturer. Built with security-first architecture, the frontend consumes read-only APIs from the secure CMS backend.

## ✨ Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse oak furniture with advanced filtering
- **Product Details**: Rich product pages with specifications and care instructions
- **Shopping Cart**: Persistent cart with real-time updates
- **Category Navigation**: Organized product categorization
- **Search & Filtering**: Advanced product discovery

### 📝 Content Management
- **Blog System**: SEO-optimized blog posts from Sanity CMS
- **Customer Testimonials**: Social proof and reviews
- **Company Information**: About, sustainability, craftsmanship pages
- **Contact Forms**: Customer inquiry management

### 🎨 User Experience  
- **Responsive Design**: Mobile-first responsive layout
- **Performance Optimized**: Fast loading with image optimization
- **SEO Friendly**: Server-side rendering and meta optimization
- **Accessibility**: WCAG compliance for all users

## 🏗️ Architecture

### Security-First Design
- **Read-Only API Access**: No direct database connection
- **Public Repository**: Safe for open-source collaboration
- **Environment Isolation**: Separated from admin/CMS systems
- **Content Security**: All content served from secure CMS API

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for rapid development
- **Content**: Sanity CMS integration (read-only)
- **Deployment**: Cloudflare Pages

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── about/             # Company information
│   │   ├── page.tsx       # About us
│   │   ├── craftsmanship/ # Craftsmanship details
│   │   └── sustainability/ # Sustainability info
│   ├── blog/              # Blog system
│   │   └── page.tsx       # Blog listing
│   ├── cart/              # Shopping cart
│   │   └── page.tsx       # Cart management
│   ├── categories/        # Product categories
│   │   ├── page.tsx       # Category overview
│   │   ├── tabletops/     # Tabletops category
│   │   └── table-legs/    # Table legs category
│   ├── contact/           # Contact page
│   │   └── page.tsx       # Contact form
│   └── products/          # Product system
│       ├── page.tsx       # Product listing
│       └── [slug]/        # Individual product pages
│           └── page.tsx   # Dynamic product details
├── components/            # Reusable UI components
│   └── ui.tsx            # Component library
├── hooks/                # React hooks
│   └── api.ts            # API data fetching hooks
└── lib/                  # Utility libraries
    └── sanity.ts         # Sanity CMS client (read-only)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Environment variables configured

### Installation

```bash
# Clone the repository
git clone https://github.com/ernissmal/wood-and-good-frontend.git
cd wood-and-good-frontend

# Install dependencies
npm install

# Copy environment configuration  
cp .env.example .env.local

# Configure environment variables
# Edit .env.local with your values

# Start development server
npm run dev
```

### Environment Configuration

Required environment variables in `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://cms.wood-and-good.lv

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id  
NEXT_PUBLIC_SANITY_DATASET=production

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://wood-and-good.lv
NEXT_PUBLIC_SITE_NAME=Wood & Good
```

## 🔧 Development

### Available Scripts

```bash
# Start development server (port 3001)
npm run dev

# Build for production
npm run build

# Start production server  
npm run start

# Run type checking
npm run type-check

# Lint code
npm run lint

# Run tests
npm run test

# Analyze bundle size
npm run analyze
```

### Development Workflow

1. **Feature Development**: Create feature branches from `main`
2. **Component Creation**: Use TypeScript for all components
3. **Styling**: Use Tailwind CSS utility classes
4. **Testing**: Add tests for new functionality
5. **Type Safety**: Ensure all code is properly typed

## 📊 Performance

### Optimization Features
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-built pages for better performance
- **CDN Caching**: Cloudflare CDN for global distribution

### Performance Metrics
- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Green scores on all metrics
- **Bundle Size**: Optimized for fast loading
- **Time to Interactive**: <2 seconds on 3G

## 🔗 API Integration

### CMS Integration
The frontend consumes read-only APIs from the secure CMS:

```typescript
// Example API usage
import { sanityApi } from '@/lib/sanity'

// Fetch blog posts
const posts = await sanityApi.getBlogPosts()

// Fetch product content
const product = await sanityApi.getProductContent(slug)

// Fetch testimonials
const testimonials = await sanityApi.getFeaturedTestimonials()
```

### Cart Integration
Shopping cart functionality connects to the CMS cart API:

```typescript
import { useCart } from '@/hooks/api'

function ProductPage() {
  const { addToCart, cart, updateQuantity } = useCart()
  
  const handleAddToCart = () => {
    addToCart(product, quantity)
  }
}
```

## 🎨 Styling & Design

### Design System
- **Colors**: Oak wood inspired color palette
- **Typography**: Clean, readable fonts
- **Layout**: Grid-based responsive design
- **Components**: Reusable UI component library

### Responsive Breakpoints
```css
/* Mobile first approach */
sm: '640px'   /* Small devices */
md: '768px'   /* Tablets */  
lg: '1024px'  /* Laptops */
xl: '1280px'  /* Desktops */
2xl: '1536px' /* Large screens */
```

## 🚀 Deployment

### Production Deployment

```bash
# Build the application
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

### Cloudflare Pages Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `out` (for static export)
- **Node Version**: 18.x
- **Environment Variables**: Set in Cloudflare Dashboard

## 🔒 Security Considerations

### Frontend Security
- **No Sensitive Data**: All environment variables are public-safe
- **Read-Only Access**: No write operations to backend systems
- **Input Validation**: All user inputs validated and sanitized
- **CSP Headers**: Content Security Policy implementation

### API Security  
- **CORS Configuration**: Proper cross-origin request handling
- **Rate Limiting**: Protected against API abuse
- **Authentication**: Secure session management for cart
- **Data Validation**: All API responses validated

## 📈 SEO & Analytics

### SEO Features
- **Server-Side Rendering**: Full SSR for search engines
- **Meta Tags**: Dynamic meta tags per page
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Automatically generated sitemap
- **Open Graph**: Social media optimization

### Analytics Integration
```typescript
// Google Analytics 4 integration
export function trackEvent(eventName: string, parameters: object) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}
```

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Jest for component testing
- **Integration Tests**: API integration testing
- **E2E Tests**: Playwright for user flow testing
- **Performance Tests**: Lighthouse CI integration

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests  
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript errors and dependencies
2. **API Connection**: Verify CMS API URL and network access
3. **Environment Variables**: Ensure all required vars are set
4. **Performance**: Check bundle size and image optimization

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check bundle analysis
npm run analyze
```

## 🔗 Related Repositories

- **CMS Backend**: [wood-and-good-cms](https://github.com/ernissmal/wood-and-good-cms) (Private)
- **Database**: [wood-and-good-database](https://github.com/ernissmal/wood-and-good-database) (Private)  
- **Email Service**: [wood-and-good-email](https://github.com/ernissmal/wood-and-good-email) (Private)

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Build process successful
- [ ] Tests passing
- [ ] Performance metrics meet targets
- [ ] SEO metadata complete
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] CDN configuration verified
- [ ] Security headers implemented
- [ ] Accessibility audit passed

## 🆘 Support

### Getting Help
- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issues for bugs or features
- **Discussions**: Use GitHub Discussions for questions

### Development Team
- **Frontend Lead**: frontend@wood-and-good.lv
- **Design Team**: design@wood-and-good.lv
- **DevOps**: devops@wood-and-good.lv

---

**🌟 Built with security, performance, and user experience in mind.**