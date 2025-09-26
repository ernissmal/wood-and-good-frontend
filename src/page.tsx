'use client';

import { useCategories, useFeaturedProducts, useFeaturedBlogPosts, useCart } from '../hooks/api';
import { ProductGrid, CategoryCard, BlogPostCard, LoadingSpinner, ErrorMessage } from '../components/ui';
import Link from 'next/link';

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
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-oak-800 mb-6">
              Handcrafted Oak Furniture
            </h1>
            <p className="text-xl text-oak-600 mb-8 max-w-3xl mx-auto">
              Premium quality solid oak furniture, sustainably sourced and expertly crafted 
              for your home. Each piece tells a story of timeless craftsmanship.
            </p>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Link href="/products" className="btn-primary inline-block">
                Shop Collection
              </Link>
              <Link href="/about" className="btn-secondary inline-block">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              From elegant dining tables to comfortable seating, discover furniture that combines 
              traditional craftsmanship with modern functionality.
            </p>
          </div>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-oak-100 rounded-lg aspect-video animate-pulse"></div>
              ))}
            </div>
          ) : categoriesError ? (
            <ErrorMessage message={categoriesError} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
          
          {categories.length > 4 && (
            <div className="text-center mt-8">
              <Link
                href="/categories"
                className="text-oak-600 hover:text-oak-800 font-semibold"
              >
                View All Categories →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Featured Collection
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Handpicked pieces that showcase the beauty and durability of solid oak wood. 
              Perfect for creating spaces that last generations.
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
            <div className="text-center mt-8">
              <Link
                href="/products"
                className="btn-primary inline-block"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-oak-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-oak-800 mb-6">Sustainable Craftsmanship</h2>
              <p className="text-oak-600 mb-6 text-lg">
                For over three generations, we&apos;ve been crafting premium oak furniture using traditional 
                techniques passed down through our family. Every piece is made from sustainably sourced 
                solid oak, ensuring both quality and environmental responsibility.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-oak-700">50+</div>
                  <div className="text-oak-600 text-sm">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-oak-700">100%</div>
                  <div className="text-oak-600 text-sm">Solid Oak</div>
                </div>
              </div>
              <Link href="/about" className="btn-primary">Learn More</Link>
            </div>
            <div className="wood-texture h-96 bg-oak-200 rounded-lg flex items-center justify-center">
              <span className="text-oak-600 font-medium">Craftsmanship Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Latest From Our Blog
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Learn about wood care, design tips, and the stories behind our craftsmanship.
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post, index) => (
                <BlogPostCard key={post.id || index} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-oak-800 mb-2">No blog posts yet</h3>
              <p className="text-oak-600">Check back soon for updates and insights.</p>
            </div>
          )}
          
          {featuredPosts.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="text-oak-600 hover:text-oak-800 font-semibold"
              >
                Read All Articles →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-oak-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-oak-200 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new collections, craftsmanship insights, and exclusive offers.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-md text-oak-800"
            />
            <button className="bg-oak-600 hover:bg-oak-700 px-6 py-3 rounded-md font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
