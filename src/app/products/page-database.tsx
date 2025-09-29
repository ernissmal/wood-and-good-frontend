'use client';

import { useState } from 'react';
import { useSanityProducts, useSanityCategories } from '../../hooks/sanity';
import { useCart } from '../../hooks/api';
import { ProductGrid, CategoryCard, LoadingSpinner, ErrorMessage } from '../../components/ui';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { products, loading: productsLoading, error: productsError, refetch } = useSanityProducts(selectedCategory);
  const { categories, loading: categoriesLoading } = useSanityCategories();
  const { addToCart, loading: cartLoading } = useCart();

  const handleAddToCart = async (productId: number) => {
    await addToCart(productId, 1);
  };

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

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 12,
      category_id: undefined,
      q: '',
      shape: '',
      finish: '',
      min_price: undefined,
      max_price: undefined,
      sort: 'name'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-textPrimary mb-4">
              Oak Furniture Collection
            </h1>
            <p className="text-lg text-textSecondary max-w-3xl mx-auto">
              Discover our complete range of handcrafted solid oak furniture. 
              Each piece is sustainably sourced and expertly crafted for lasting beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <label className="form-label">Search</label>
              <input
                type="text"
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                placeholder="Search products..."
                className="form-control"
              />
            </div>

            {/* Category */}
            <div>
              <label className="form-label">Category</label>
              <select
                value={filters.category_id || ''}
                onChange={(e) => handleFilterChange('category_id', e.target.value ? parseInt(e.target.value) : undefined)}
                className="form-control"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Shape */}
            <div>
              <label className="form-label">Shape</label>
              <select
                value={filters.shape}
                onChange={(e) => handleFilterChange('shape', e.target.value)}
                className="form-control"
              >
                <option value="">All Shapes</option>
                <option value="round">Round</option>
                <option value="rectangular">Rectangular</option>
                <option value="square">Square</option>
              </select>
            </div>

            {/* Finish */}
            <div>
              <label className="form-label">Finish</label>
              <select
                value={filters.finish}
                onChange={(e) => handleFilterChange('finish', e.target.value)}
                className="form-control"
              >
                <option value="">All Finishes</option>
                <option value="natural oil">Natural Oil</option>
                <option value="matte lacquer">Matte Lacquer</option>
                <option value="gloss lacquer">Gloss Lacquer</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="form-label">Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="form-control"
              >
                <option value="name">Name A-Z</option>
                <option value="name_desc">Name Z-A</option>
                <option value="price">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="filter-actions">
            <div className="filter-summary">
              {pagination.total > 0 && (
                <>Showing {((pagination.page - 1) * pagination.limit) + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products</>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="filter-clear-btn"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid
            products={products}
            loading={productsLoading}
            error={productsError || undefined}
            onAddToCart={handleAddToCart}
            addingToCartId={cartLoading ? undefined : undefined}
            onRetry={refetch}
          />

          {/* Pagination */}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            loading={productsLoading}
          />
        </div>
      </section>

      {/* Categories Section (if no filters applied) */}
      {!filters.category_id && !filters.q && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-textPrimary mb-4">
                Browse by Category
              </h2>
              <p className="text-textSecondary max-w-2xl mx-auto">
                Explore our furniture collections organized by type and functionality.
              </p>
            </div>

            {categoriesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-oak-100 rounded-lg aspect-video animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleFilterChange('category_id', category.id)}
                    className="cursor-pointer"
                  >
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}