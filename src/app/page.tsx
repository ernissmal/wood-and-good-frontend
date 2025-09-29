'use client';

import { useCategories, useFeaturedProducts, useFeaturedBlogPosts, useCart } from '../hooks/api';
import { ProductGrid, CategoryCard, BlogPostCard, LoadingSpinner, ErrorMessage } from '../components/ui';
import Link from 'next/link';
import HandymanIcon from '@mui/icons-material/Handyman';
import NatureIcon from '@mui/icons-material/Nature';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InfoIcon from '@mui/icons-material/Info';

export default function Home() {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { products: featuredProducts, loading: productsLoading, error: productsError, refetch: refetchProducts } = useFeaturedProducts();
  const { posts: featuredPosts, loading: postsLoading, error: postsError } = useFeaturedBlogPosts();
  const { addToCart, loading: cartLoading } = useCart();

  const handleAddToCart = async (productId: number) => {
    await addToCart(productId, 1);
  };
  
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="hero-gradient py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 wood-texture opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-oak-600/90 backdrop-blur-sm rounded-full px-4 py-2 text-oak400 text-sm font-medium mb-6">
                <NatureIcon className="w-4 h-4" />
                <span>Sustainably Crafted Since 1970</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-textPrimary mb-6 leading-tight">
                Handcrafted
                <span className="block text-oak-600">Oak Furniture</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-textSecondary mb-8 max-w-3xl mx-auto leading-relaxed">
                Premium quality solid oak furniture, sustainably sourced and expertly crafted 
                in Latvia. Each piece tells a story of timeless craftsmanship and three generations 
                of woodworking excellence.
              </p>
            </div>
            
            <div className="flex gap-4 justify-center flex-col sm:flex-row max-w-md mx-auto sm:max-w-none">
              <Link href="/products" className="btn-primary text-lg px-8 py-4">
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Shop Collection</span>
                <ArrowForwardIcon className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-secondary text-lg px-8 py-4">
                <InfoIcon className="w-5 h-5" />
                <span>Our Story</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-oak-600 rounded-full px-4 py-2 text-white text-sm font-medium mb-4">
              <HandymanIcon className="w-4 h-4" />
              <span>Explore Our Collections</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textPrimary mb-6">
              Shop by Category
            </h2>
            <p className="text-lg text-textSecondary max-w-3xl mx-auto leading-relaxed">
              From elegant dining tables to comfortable seating, discover furniture that combines 
              traditional Latvian craftsmanship with modern functionality and timeless design.
            </p>
          </div>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-oak-100 rounded-xl aspect-video animate-pulse"></div>
              ))}
            </div>
          ) : categoriesError ? (
            <ErrorMessage message={categoriesError} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {categories.slice(0, 4).map((category: any) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
          
          {categories.length > 4 && (
            <div className="text-center mt-12">
              <Link
                href="/categories"
                className="inline-flex items-center space-x-2 text-text-accent hover:text-oak-600 font-semibold text-lg transition-colors duration-200"
              >
                <span>View All Categories</span>
                <ArrowForwardIcon className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-oak-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-oak-600 rounded-full px-4 py-2 text-oak400 text-sm font-medium mb-4">
              <StarIcon className="w-4 h-4" />
              <span>Handpicked by Our Masters</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textPrimary mb-6">
              Featured Collection
            </h2>
            <p className="text-lg text-textSecondary max-w-3xl mx-auto leading-relaxed">
              Handpicked pieces that showcase the beauty and durability of solid oak wood. 
              Perfect for creating spaces that last generations and tell your family's story.
            </p>
          </div>
          
          <ProductGrid
            products={featuredProducts}
            loading={productsLoading}
            error={productsError || undefined}
            onAddToCart={handleAddToCart}
            addingToCartId={cartLoading ? undefined : undefined}
            onRetry={refetchProducts}
          />
          
          {featuredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="btn-primary text-lg px-8 py-4"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>View All Products</span>
                <ArrowForwardIcon className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 bg-forest-600 rounded-full px-4 py-2 text-oak400 text-sm font-medium mb-4">
                  <NatureIcon className="w-4 h-4" />
                  <span>Three Generations of Excellence</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textPrimary mb-6">
                  Sustainable Craftsmanship
                </h2>
                <p className="text-lg text-textSecondary mb-8 leading-relaxed">
                  For over three generations, SIA The Wood and Good has been crafting premium oak 
                  furniture using traditional techniques passed down through our family. Every piece 
                  is made from sustainably sourced solid oak from Latvian forests, ensuring both 
                  exceptional quality and environmental responsibility.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-6 bg-white rounded-xl shadow-warm">
                  <div className="text-3xl font-bold text-oak-600 mb-2">50+</div>
                  <div className="text-textMuted text-sm">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-warm">
                  <div className="text-3xl font-bold text-forest-600 mb-2">100%</div>
                  <div className="text-textMuted text-sm">Sustainable Oak</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-warm">
                  <div className="text-3xl font-bold text-earth-600 mb-2">3</div>
                  <div className="text-textMuted text-sm">Generations</div>
                </div>
              </div>
              
              <Link href="/about" className="btn-primary text-lg px-8 py-4">
                <InfoIcon className="w-5 h-5" />
                <span>Learn More</span>
                <ArrowForwardIcon className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="wood-texture h-96 lg:h-[28rem] bg-oak-gradient rounded-2xl flex items-center justify-center shadow-warm-lg overflow-hidden">
                <div className="text-center text-oak-50 px-6">
                  <HandymanIcon sx={{ fontSize: 80 }} className="mb-4 opacity-80" />
                  <p className="text-lg font-medium opacity-90">Master Craftsman at Work</p>
                  <p className="text-sm opacity-70">Traditional techniques, modern precision</p>
                </div>
              </div>
              
              {/* Floating feature badges */}
              <div className="absolute -top-4 -right-4 bg-forest-500 text-oak-50 p-4 rounded-xl shadow-lg">
                <NatureIcon className="w-6 h-6 mb-1" />
                <div className="text-xs font-medium">Eco-Friendly</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-oak-600 text-oak-50 p-4 rounded-xl shadow-lg">
                <HandymanIcon className="w-6 h-6 mb-1" />
                <div className="text-xs font-medium">Handcrafted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Blog Posts Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-oak-600 rounded-full px-4 py-2 text-white text-sm font-medium mb-4">
              <InfoIcon className="w-4 h-4" />
              <span>Stories from Our Workshop</span>
            </div>
            
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textPrimary mb-6">
              Latest From Our Blog
            </h2>
              <p className="text-lg text-textSecondary max-w-3xl mx-auto leading-relaxed">
              Learn about wood care, design tips, and the stories behind our craftsmanship and traditions.
            </p>
          </div>
          
          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-video bg-oak-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-oak-200 rounded mb-2"></div>
                    <div className="h-3 bg-oak-200 rounded mb-3 w-2/3"></div>
                    <div className="h-3 bg-oak-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : postsError ? (
            <ErrorMessage message={postsError} />
          ) : featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredPosts.slice(0, 3).map((post: any, index: number) => (
                <BlogPostCard key={post.id || index} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-oak-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <InfoIcon sx={{ fontSize: 48 }} className="text-oak-400" />
              </div>
              <h3 className="text-xl font-semibold text-textPrimary mb-2">No blog posts yet</h3>
              <p className="text-textSecondary max-w-md mx-auto">
                Check back soon for updates, craftsmanship insights, and stories from our workshop.
              </p>
            </div>
          )}
          
          {featuredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center space-x-2 text-text-accent hover:text-oak-600 font-semibold text-lg transition-colors duration-200"
              >
                <span>Read All Articles</span>
                <ArrowForwardIcon className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-earth-800 text-oak-50 relative overflow-hidden">
        <div className="absolute inset-0 wood-texture opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-oak-200 leading-relaxed max-w-2xl mx-auto">
              Get the latest updates on new collections, craftsmanship insights, 
              exclusive offers, and stories from our workshop in Latvia.
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="form-control flex-1 !px-6 !py-4 !text-lg border-0 focus:ring-2 focus:ring-oak-400 focus:outline-none"
                required
              />
              <button 
                type="submit"
                className="bg-oak-600 hover:bg-oak-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm text-oak-300 mt-4">
              Join 500+ furniture enthusiasts. Unsubscribe anytime.
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-oak-700">
            <div className="flex items-center justify-center space-x-3">
              <LocalShippingIcon className="w-6 h-6 text-oak-400" />
              <div className="text-left">
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-oak-300">Throughout Latvia</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <HandymanIcon className="w-6 h-6 text-oak-400" />
              <div className="text-left">
                <p className="font-semibold">Custom Orders</p>
                <p className="text-sm text-oak-300">Made to measure</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <NatureIcon className="w-6 h-6 text-forest-400" />
              <div className="text-left">
                <p className="font-semibold">Sustainable</p>
                <p className="text-sm text-oak-300">Locally sourced</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
