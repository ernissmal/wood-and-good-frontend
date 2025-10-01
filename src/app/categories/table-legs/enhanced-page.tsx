'use client';

import { useState } from 'react';
import { 
  FilterList, 
  Sort, 
  ViewModule, 
  ViewList, 
  TableRestaurant,
  Architecture,
  CropSquare,
  AutoFixHigh
} from '@mui/icons-material';
import { useTableLegsManager } from '../../../hooks/enhanced-sanity';
import { PRODUCT_SORT_OPTIONS, type ProductFilters } from '../../../lib/sorting';
import { ProductCard, LoadingSpinner, ErrorMessage } from '../../../components/ui';

export default function TableLegsPage() {
  const {
    tableLegs,
    loading,
    error,
    legShape,
    setLegShape,
    sortOptions,
    filters,
    setSortOptions,
    setFilters,
    clearFilters,
    refetch,
    totalCount,
    filteredCount
  } = useTableLegsManager();

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

  const legShapeOptions = [
    { 
      label: 'All Leg Shapes', 
      value: 'all', 
      icon: TableRestaurant,
      description: 'View all available table leg styles'
    },
    { 
      label: 'X Shape Legs', 
      value: 'x-shape', 
      icon: Architecture,
      description: 'Modern and striking X-shaped legs'
    },
    { 
      label: 'Rectangular Legs', 
      value: 'rectangular', 
      icon: CropSquare,
      description: 'Classic and sturdy rectangular legs'
    },
    { 
      label: 'Custom Legs', 
      value: 'custom', 
      icon: AutoFixHigh,
      description: 'Bespoke legs designed to your specifications'
    }
  ];

  const currentShapeOption = legShapeOptions.find(option => option.value === legShape);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-oak-800 mb-4">
              Table Legs
            </h1>
            <p className="text-lg text-oak-600 max-w-3xl mx-auto">
              Choose from our signature X-shape legs for modern appeal or rectangular legs for classic elegance. 
              Custom solutions available for unique requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Leg Shape Selector */}
      <section className="bg-oak-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-oak-800 mb-4">Choose Your Style</h2>
            <p className="text-oak-600">Select the leg shape that best fits your table and style preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legShapeOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = legShape === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => setLegShape(option.value as any)}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    isSelected 
                      ? 'border-oak-600 bg-oak-100 shadow-md' 
                      : 'border-gray-200 bg-white hover:border-oak-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg mr-3 ${
                      isSelected ? 'bg-oak-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent sx={{ fontSize: 24 }} />
                    </div>
                    <h3 className={`font-semibold ${
                      isSelected ? 'text-oak-800' : 'text-gray-800'
                    }`}>
                      {option.label}
                    </h3>
                  </div>
                  <p className={`text-sm ${
                    isSelected ? 'text-oak-600' : 'text-gray-600'
                  }`}>
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters and Sort Controls */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left side controls */}
            <div className="flex items-center gap-4">
              {/* Current Selection Display */}
              <div className="flex items-center gap-2 bg-oak-50 px-3 py-2 rounded-md">
                {currentShapeOption && (
                  <>
                    <currentShapeOption.icon sx={{ fontSize: 16 }} className="text-oak-600" />
                    <span className="text-sm font-medium text-oak-800">
                      {currentShapeOption.label}
                    </span>
                  </>
                )}
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
                {filteredCount} of {totalCount} table legs
                {(filteredCount !== totalCount || legShape !== 'all') && (
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
                      (opt: any) => opt.field === field && opt.direction === direction
                    );
                    if (sortOption) handleSortChange(sortOption);
                  }}
                  className="form-control text-sm"
                >
                  {PRODUCT_SORT_OPTIONS.map((option: any) => (
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
                    placeholder="Search table legs..."
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

      {/* Table Legs Grid/List */}
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
          ) : tableLegs.length > 0 ? (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {tableLegs.map((product: any) => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 text-oak-600 flex justify-center">
                <TableRestaurant sx={{ fontSize: 72 }} />
              </div>
              <h3 className="text-lg font-semibold text-oak-800 mb-2">No table legs found</h3>
              <p className="text-oak-600 mb-4">
                {legShape !== 'all' || Object.keys(filters).length > 0
                  ? 'Try adjusting your selection or filters to see more table legs.'
                  : 'Check back soon for new table leg designs.'
                }
              </p>
              {(legShape !== 'all' || Object.keys(filters).length > 0) && (
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

      {/* Leg Shape Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              About Our Table Leg Styles
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Each leg style is carefully crafted to provide both functionality and aesthetic appeal, 
              ensuring your table stands beautifully for years to come.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Architecture className="text-oak-600" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-3">
                X Shape Legs
              </h3>
              <p className="text-oak-600">
                Modern and striking design that adds contemporary flair to any space. 
                The X-shape provides excellent stability while creating visual interest.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CropSquare className="text-oak-600" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-3">
                Rectangular Legs
              </h3>
              <p className="text-oak-600">
                Classic and sturdy design that complements traditional and modern interiors alike. 
                Reliable support with timeless appeal.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AutoFixHigh className="text-oak-600" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-3">
                Custom Legs
              </h3>
              <p className="text-oak-600">
                Bespoke designs created to your exact specifications. 
                Perfect for unique spaces or specific design requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}