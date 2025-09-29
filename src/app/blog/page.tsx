'use client';

import { CleaningServices, Palette, Build, LocalFlorist, Home, MenuBook } from '@mui/icons-material';

import { useState } from 'react';
import { useBlogPosts } from '../../hooks/api';
import { BlogPostCard, LoadingSpinner, ErrorMessage, Pagination } from '../../components/ui';

export default function BlogPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    category: '',
    featured: false
  });

  const { posts, pagination, loading, error, refetch } = useBlogPosts(filters);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    'Wood Care',
    'Design Tips', 
    'Craftsmanship',
    'Sustainability',
    'Home Decor',
    'Furniture History'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-textPrimary mb-4">
              Wood & Good Blog
            </h1>
            <p className="text-lg text-textSecondary max-w-3xl mx-auto">
              Discover the art of woodworking, care tips for your furniture, design inspiration, 
              and stories from our workshop. Learn about the craft behind every piece.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <span className="form-label">Category</span>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="form-control py-2 text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={filters.featured}
                  onChange={(e) => handleFilterChange('featured', e.target.checked)}
                  className="h-4 w-4 rounded border border-gray-300 text-oak-600 focus:ring-oak-500"
                />
                <span className="text-sm text-textSecondary">Featured only</span>
              </label>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({ page: 1, limit: 9, category: '', featured: false })}
              className="text-oak-600 hover:text-oak-800 text-sm font-medium ml-auto"
            >
              Clear Filters
            </button>
          </div>

          {/* Results Count */}
          {pagination.total > 0 && (
            <div className="filter-summary mt-4">
              Showing {((pagination.page - 1) * pagination.limit) + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} articles
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
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
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-oak-800 mb-2">No articles found</h3>
              <p className="text-oak-600">
                {filters.category || filters.featured 
                  ? 'Try adjusting your filters to see more articles.'
                  : 'Check back soon for updates and insights about woodworking and furniture care.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-oak-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-oak-200 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest articles about woodworking, 
            furniture care, and behind-the-scenes stories from our workshop.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-md text-oak-800 focus:outline-none focus:ring-2 focus:ring-oak-500"
            />
            <button className="bg-oak-600 hover:bg-oak-700 px-6 py-3 rounded-md font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">
              Popular Topics
            </h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              Explore our most popular article categories and learn about the art of working with oak.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className="bg-oak-50 hover:bg-oak-100 p-4 rounded-lg text-center transition-colors group"
              >
                <div className="text-2xl mb-2 text-oak-600 flex justify-center">
                  {category === 'Wood Care' && <CleaningServices sx={{ fontSize: 24 }} />}
                  {category === 'Design Tips' && <Palette sx={{ fontSize: 24 }} />}
                  {category === 'Craftsmanship' && <Build sx={{ fontSize: 24 }} />}
                  {category === 'Sustainability' && <LocalFlorist sx={{ fontSize: 24 }} />}
                  {category === 'Home Decor' && <Home sx={{ fontSize: 24 }} />}
                  {category === 'Furniture History' && <MenuBook sx={{ fontSize: 24 }} />}
                </div>
                <h3 className="font-semibold text-oak-800 group-hover:text-oak-600 transition-colors">
                  {category}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}