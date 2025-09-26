'use client';

import { useState } from 'react';
import { useProducts } from '../../../hooks/api';
import { ProductGrid, LoadingSpinner, ErrorMessage, Pagination } from '../../../components/ui';
import Link from 'next/link';
import { RadioButtonUnchecked, CropLandscape, Stop, NaturePeople } from '@mui/icons-material';

export default function TabletopsPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    category_id: 1, // Tabletops category ID
    q: '',
    shape: '',
    finish: '',
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    sort: 'featured'
  });

  const { products, pagination, loading: productsLoading, error: productsError, refetch } = useProducts(filters);

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
      category_id: 1, // Keep tabletops category
      q: '',
      shape: '',
      finish: '',
      min_price: undefined,
      max_price: undefined,
      sort: 'featured'
    });
  };

  const tabletopGuide = [
    {
      shape: "Round Tabletops",
      description: "Perfect for intimate dining and conversation. Round tables create a warm, inclusive atmosphere.",
      bestFor: "Small to medium dining rooms, breakfast nooks, bistro settings",
      seating: "4-6 people comfortably",
      icon: "round"
    },
    {
      shape: "Rectangular Tabletops", 
      description: "Classic choice for formal dining. Maximum seating capacity and traditional elegance.",
      bestFor: "Larger dining rooms, family gatherings, formal occasions",
      seating: "6-10 people comfortably",
      icon: "rectangular"
    },
    {
      shape: "Square Tabletops",
      description: "Balanced and versatile. Great for both intimate meals and group conversations.",
      bestFor: "Square dining rooms, casual dining, small families",
      seating: "4 people comfortably",
      icon: "square"
    },
    {
      shape: "Live Edge Slabs",
      description: "Unique, natural beauty with preserved bark edges. Each piece is one-of-a-kind.",
      bestFor: "Statement pieces, rustic decor, nature-inspired interiors",
      seating: "Variable, depending on size",
      icon: "natural"
    }
  ];

  const sizeGuide = [
    { seats: "2-4 people", round: "90-110cm diameter", rectangular: "120x80cm", square: "80x80cm" },
    { seats: "4-6 people", round: "120-140cm diameter", rectangular: "160x90cm", square: "120x120cm" },
    { seats: "6-8 people", round: "150-170cm diameter", rectangular: "200x90cm", square: "150x150cm" },
    { seats: "8-10 people", round: "180cm+ diameter", rectangular: "240x100cm", square: "180x180cm" }
  ];

  const finishOptions = [
    {
      name: "Natural Oil Finish",
      description: "Penetrates the wood to enhance natural grain while providing protection",
      benefits: ["Breathable finish", "Easy to repair", "Natural appearance", "Food-safe"],
      maintenance: "Reapply annually",
      bestFor: "Daily use tables, natural aesthetic preferences"
    },
    {
      name: "Matte Lacquer",
      description: "Durable surface coating that provides excellent protection with subtle sheen",
      benefits: ["Superior durability", "Water resistant", "Easy to clean", "Long-lasting"],
      maintenance: "Professional refinishing every 10-15 years",
      bestFor: "Heavy use, families with children, low maintenance"
    },
    {
      name: "Gloss Lacquer", 
      description: "High-shine finish that showcases wood grain with maximum protection",
      benefits: ["Maximum protection", "Easy to wipe clean", "Dramatic appearance", "Stain resistant"],
      maintenance: "Professional refinishing every 15-20 years", 
      bestFor: "Formal dining rooms, showcase pieces, modern interiors"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-oak-800 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Premium Oak Tabletops
            </h1>
            <p className="text-xl text-oak-200 max-w-3xl mx-auto mb-8">
              Solid oak tabletops crafted for beauty and durability. Choose from round, rectangular, 
              square, and unique live-edge designs. Each piece showcases the natural grain of premium European oak.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Shop Tabletops
              </button>
              <button
                onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Buying Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <label className="form-label">Search Tabletops</label>
              <input
                type="text"
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                placeholder="Search tabletops..."
                className="form-control"
              />
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
                <option value="irregular">Live Edge</option>
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

            {/* Price Range */}
            <div>
              <label className="form-label">Max Price (€)</label>
              <select
                value={filters.max_price || ''}
                onChange={(e) => handleFilterChange('max_price', e.target.value ? parseInt(e.target.value) : undefined)}
                className="form-control"
              >
                <option value="">Any Price</option>
                <option value="300">Under €300</option>
                <option value="400">Under €400</option>
                <option value="500">Under €500</option>
                <option value="600">Under €600</option>
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
                <option value="featured">Featured First</option>
                <option value="name">Name A-Z</option>
                <option value="price">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <div className="filter-summary">
              {pagination.total > 0 && (
                <>Showing {((pagination.page - 1) * pagination.limit) + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} tabletops</>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="filter-clear-btn"
            >
              Clear Filters
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
            onAddToCart={(productId) => {
              // Add to cart functionality
              console.log('Add to cart:', productId);
            }}
            onRetry={refetch}
          />

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            loading={productsLoading}
          />
        </div>
      </section>

      {/* Tabletop Guide */}
      <section className="py-16 bg-white" id="guide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-oak-800 mb-4">
              Choosing the Perfect Tabletop
            </h2>
            <p className="text-lg text-oak-600 max-w-3xl mx-auto">
              Let our experts guide you to the ideal tabletop for your space, style, and needs.
            </p>
          </div>

          {/* Shape Guide */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-oak-800 mb-8 text-center">Shape Selection Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tabletopGuide.map((guide, index) => (
                <div key={index} className="bg-oak-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="text-4xl mr-4 mt-1 text-oak-600">
                      {guide.icon === "round" && <RadioButtonUnchecked sx={{ fontSize: 48 }} />}
                      {guide.icon === "rectangular" && <CropLandscape sx={{ fontSize: 48 }} />}
                      {guide.icon === "square" && <Stop sx={{ fontSize: 48 }} />}
                      {guide.icon === "natural" && <NaturePeople sx={{ fontSize: 48 }} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-oak-800 mb-2">{guide.shape}</h4>
                      <p className="text-oak-600 mb-3">{guide.description}</p>
                      <div className="space-y-1 text-sm">
                        <div><span className="font-medium text-oak-800">Best for:</span> {guide.bestFor}</div>
                        <div><span className="font-medium text-oak-800">Seating:</span> {guide.seating}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Size Guide */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-oak-800 mb-8 text-center">Size Guide</h3>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-oak-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Seating</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Round</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Rectangular</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Square</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sizeGuide.map((size, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-oak-800">{size.seats}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-oak-600">{size.round}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-oak-600">{size.rectangular}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-oak-600">{size.square}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Finish Guide */}
          <div>
            <h3 className="text-3xl font-bold text-oak-800 mb-8 text-center">Finish Options</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {finishOptions.map((finish, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="text-xl font-bold text-oak-800 mb-3">{finish.name}</h4>
                  <p className="text-oak-600 mb-4">{finish.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-oak-800 mb-2">Benefits:</h5>
                    <ul className="space-y-1 text-sm text-oak-600">
                      {finish.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-green-600 mr-2">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="font-semibold text-oak-800">Maintenance:</span> {finish.maintenance}
                    </div>
                    <div>
                      <span className="font-semibold text-oak-800">Best for:</span> {finish.bestFor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Tabletops CTA */}
      <section className="bg-oak-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need a Custom Tabletop?
          </h2>
          <p className="text-xl text-oak-200 mb-8 max-w-2xl mx-auto">
            We craft custom tabletops to your exact specifications. Choose your size, shape, 
            finish, and edge profile for a truly unique piece.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Request Custom Quote
            </Link>
            <Link 
              href="/categories/table-legs"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Table Legs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}