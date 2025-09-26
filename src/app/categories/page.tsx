'use client';

import { useCategories } from '../../hooks/api';
import { CategoryCard, LoadingSpinner, ErrorMessage } from '../../components/ui';

export default function CategoriesPage() {
  const { categories, loading, error, refetch } = useCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-oak-800 mb-4">
              Furniture Categories
            </h1>
            <p className="text-lg text-oak-600 max-w-3xl mx-auto">
              Explore our complete range of handcrafted oak furniture organized by type and function. 
              Each category represents decades of craftsmanship expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-oak-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Our Specialties
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Focus on table tops and table legs - our core expertise in creating perfect dining solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tabletops */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-oak-100 flex items-center justify-center">
                <div className="text-6xl text-oak-600">🪵</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-oak-800 mb-4 group-hover:text-oak-600 transition-colors">
                  Premium Oak Tabletops
                </h3>
                <p className="text-oak-600 mb-6">
                  Solid oak tabletops in round, rectangular, square, and unique live-edge designs. 
                  Each piece showcases the natural beauty of premium European oak.
                </p>
                <ul className="space-y-2 text-sm text-oak-600 mb-6">
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">•</span>
                    Multiple shapes and sizes available
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">•</span>
                    Natural oil and lacquer finish options
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">•</span>
                    Custom sizes on request
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">•</span>
                    Live edge slabs for unique character
                  </li>
                </ul>
                <a 
                  href="/categories/tabletops"
                  className="bg-oak-600 hover:bg-oak-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                >
                  Explore Tabletops
                </a>
              </div>
            </div>

            {/* Table Legs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-oak-100 flex items-center justify-center">
                <div className="text-6xl text-oak-600">🦵</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-oak-800 mb-4 group-hover:text-oak-600 transition-colors">
                  Handcrafted Table Legs
                </h3>
                <p className="text-oak-600 mb-6">
                  From classic turned legs to modern hairpin styles and rustic farmhouse designs. 
                  Perfect support for any tabletop style.
                </p>
                <ul className="space-y-2 text-sm text-oak-600 mb-6">
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">•</span>
                    Traditional and contemporary styles
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">•</span>
                    Standard and custom heights
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">•</span>
                    Mounting hardware included
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-2">•</span>
                    Professional installation available
                  </li>
                </ul>
                <a 
                  href="/categories/table-legs"
                  className="bg-oak-600 hover:bg-oak-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                >
                  Explore Table Legs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              All Categories
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Browse our complete range of handcrafted oak furniture categories.
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🪑</div>
              <h3 className="text-lg font-semibold text-oak-800 mb-2">No categories available</h3>
              <p className="text-oak-600">Check back soon for our furniture categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Why Choose by Category?
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Our furniture categories help you find exactly what you need for your space, 
              whether you're furnishing a single room or your entire home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-3">
                Targeted Shopping
              </h3>
              <p className="text-oak-600">
                Find exactly what you need without browsing through unrelated items. 
                Each category is carefully curated for specific room functions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-3">
                Coordinated Design
              </h3>
              <p className="text-oak-600">
                Items within each category are designed to work together harmoniously, 
                making it easy to create cohesive room designs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-oak-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📐</span>
              </div>
              <h3 className="text-xl font-semibold text-oak-800 mb-3">
                Size & Function
              </h3>
              <p className="text-oak-600">
                Each category includes detailed specifications and functionality information 
                to help you choose the perfect size and style for your space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Planning Guide */}
      <section className="py-16 bg-oak-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">
              Room Planning Guide
            </h2>
            <p className="text-oak-600 max-w-2xl mx-auto">
              Not sure which categories you need? Here's a quick guide to help you 
              plan furniture for different rooms in your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-oak-800 mb-3 flex items-center">
                🍽️ Dining Room
              </h3>
              <ul className="text-sm text-oak-600 space-y-1">
                <li>• Dining Tables</li>
                <li>• Dining Chairs</li>
                <li>• Sideboards</li>
                <li>• Display Cabinets</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-oak-800 mb-3 flex items-center">
                🛋️ Living Room
              </h3>
              <ul className="text-sm text-oak-600 space-y-1">
                <li>• Coffee Tables</li>
                <li>• TV Units</li>
                <li>• Bookcases</li>
                <li>• Side Tables</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-oak-800 mb-3 flex items-center">
                🛏️ Bedroom
              </h3>
              <ul className="text-sm text-oak-600 space-y-1">
                <li>• Bed Frames</li>
                <li>• Wardrobes</li>
                <li>• Nightstands</li>
                <li>• Dressers</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-oak-800 mb-3 flex items-center">
                💼 Office
              </h3>
              <ul className="text-sm text-oak-600 space-y-1">
                <li>• Desks</li>
                <li>• Office Chairs</li>
                <li>• Filing Cabinets</li>
                <li>• Bookcases</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Furniture CTA */}
      <section className="py-16 bg-oak-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See What You Need?</h2>
          <p className="text-oak-200 mb-8 max-w-2xl mx-auto">
            We specialize in custom oak furniture. If you don't find exactly what you're looking for 
            in our categories, we can create bespoke pieces tailored to your specific requirements.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <a 
              href="/contact" 
              className="bg-oak-600 hover:bg-oak-700 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Request Custom Quote
            </a>
            <a 
              href="/products" 
              className="bg-transparent border-2 border-oak-600 hover:bg-oak-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}