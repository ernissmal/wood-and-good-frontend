'use client';

import { useState } from 'react';
import { 
  FilterList, 
  Sort, 
  ViewModule, 
  ViewList, 
  TableBar, 
  TableRestaurant, 
  Chair 
} from '@mui/icons-material';
import { useProductManager } from '../../hooks/enhanced-sanity';
import { 
  PRODUCT_SORT_OPTIONS, 
  PRODUCT_CATEGORY_TYPES,
  getCategoryTypeLabel,
  type ProductFilters 
} from '../../lib/sorting';
import { ProductCard, LoadingSpinner, ErrorMessage } from '../../components/ui';

export default function EnhancedProductsPage() {
  const {
    products,
    loading,
    error,
    sortOptions,
    filters,
    setSortOptions,
    setFilters,
    clearFilters,
    refetch,
    totalCount,
    filteredCount
  } = useProductManager();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters({ [key]: value });
  };

  const handleSortChange = (sortOption: typeof PRODUCT_SORT_OPTIONS[0]) => {
    setSortOptions({
      field: sortOption.field,
      direction: sortOption.direction
    });
  };

  const categoryTypeOptions = [
    { label: 'All Products', value: '' },
    { label: getCategoryTypeLabel(PRODUCT_CATEGORY_TYPES.TABLES), value: PRODUCT_CATEGORY_TYPES.TABLES },
    { label: getCategoryTypeLabel(PRODUCT_CATEGORY_TYPES.TABLE_LEGS), value: PRODUCT_CATEGORY_TYPES.TABLE_LEGS },
    { label: getCategoryTypeLabel(PRODUCT_CATEGORY_TYPES.OTHER), value: PRODUCT_CATEGORY_TYPES.OTHER }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-oak-800 mb-4">
              Our Products
            </h1>
            <p className="text-lg text-oak-600 max-w-3xl mx-auto">
              Discover our complete range of handcrafted oak furniture. 
              Filter by category, sort by your preferences, and find the perfect pieces for your home.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Sort Controls */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left side controls */}
            <div className="flex items-center gap-4">
              {/* Category Type Filter */}
              <div className="flex items-center gap-2">
                <div className="text-2xl text-oak-600">
                  {filters.categoryType === PRODUCT_CATEGORY_TYPES.TABLES && <TableBar />}
                  {filters.categoryType === PRODUCT_CATEGORY_TYPES.TABLE_LEGS && <TableRestaurant />}
                  {filters.categoryType === PRODUCT_CATEGORY_TYPES.OTHER && <Chair />}
                  {!filters.categoryType && <ViewModule />}
                </div>
                <select
                  value={filters.categoryType || ''}
                  onChange={(e) => handleFilterChange('categoryType', e.target.value || undefined)}
                  className="form-control text-sm"
                >
                  {categoryTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggle Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  showFilters 
                    ? 'bg-oak-100 text-oak-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FilterList sx={{ fontSize: 16 }} />
                Filters
              </button>

              {/* Results Count */}
              <span className="text-sm text-gray-600">
                {filteredCount} of {totalCount} products
                {filteredCount !== totalCount && (
                  <button
                    onClick={clearFilters}
                    className="ml-2 text-oak-600 hover:text-oak-800 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </span>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <Sort sx={{ fontSize: 16 }} className="text-gray-600" />
                <select
                  value={`${sortOptions.field}-${sortOptions.direction}`}
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split('-');
                    const sortOption = PRODUCT_SORT_OPTIONS.find(
                      opt => opt.field === field && opt.direction === direction
                    );
                    if (sortOption) handleSortChange(sortOption);
                  }}
                  className="form-control text-sm"
                >
                  {PRODUCT_SORT_OPTIONS.map((option) => (
                    <option 
                      key={`${option.field}-${option.direction}`} 
                      value={`${option.field}-${option.direction}`}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-oak-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <ViewModule sx={{ fontSize: 16 }} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-oak-600 text-white' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <ViewList sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Price Range */}
                <div>
                  <label className="form-label">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange?.min || ''}
                      onChange={(e) => handleFilterChange('priceRange', {
                        ...filters.priceRange,
                        min: e.target.value ? Number(e.target.value) : undefined
                      })}
                      className="form-control text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange?.max || ''}
                      onChange={(e) => handleFilterChange('priceRange', {
                        ...filters.priceRange,
                        max: e.target.value ? Number(e.target.value) : undefined
                      })}
                      className="form-control text-sm"
                    />
                  </div>
                </div>

                {/* Featured Filter */}
                <div>
                  <label className="form-label">Featured Products</label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.featured || false}
                      onChange={(e) => handleFilterChange('featured', e.target.checked || undefined)}
                      className="h-4 w-4 rounded border-gray-300 text-oak-600 focus:ring-oak-500"
                    />
                    <span className="text-sm">Show featured only</span>
                  </label>
                </div>

                {/* In Stock Filter */}
                <div>
                  <label className="form-label">Availability</label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.inStock !== false}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked ? undefined : false)}
                      className="h-4 w-4 rounded border-gray-300 text-oak-600 focus:ring-oak-500"
                    />
                    <span className="text-sm">In stock only</span>
                  </label>
                </div>

                {/* Search */}
                <div>
                  <label className="form-label">Search</label>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value || undefined)}
                    className="form-control text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-video bg-oak-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-oak-200 rounded mb-2"></div>
                    <div className="h-3 bg-oak-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : products.length > 0 ? (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 text-oak-600 flex justify-center">
                <Chair sx={{ fontSize: 72 }} />
              </div>
              <h3 className="text-lg font-semibold text-oak-800 mb-2">No products found</h3>
              <p className="text-oak-600 mb-4">
                {Object.keys(filters).length > 0 
                  ? 'Try adjusting your filters to see more products.'
                  : 'Check back soon for new products.'
                }
              </p>
              {Object.keys(filters).length > 0 && (
                <button
                  onClick={clearFilters}
                  className="bg-oak-600 hover:bg-oak-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Load More / Pagination could go here */}
    </div>
  );
}