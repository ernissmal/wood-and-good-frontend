'use client';

import { useState } from 'react';
import { useSanityProducts } from '../../../hooks/sanity';
import { LoadingSpinner, ErrorMessage } from '../../../components/ui';
import Link from 'next/link';
import { AccountBalance, StraightenRounded, Cabin, Architecture, Build, StraightenSharp, Construction } from '@mui/icons-material';

interface SanityProduct {
  _id: string;
  id: string;
  images?: string[];
  name: string;
  category?: string;
  price?: number;
}

export default function TableLegsPage() {
  const [filters, setFilters] = useState({
    q: '',
    shape: '',
    finish: '',
    sort: 'featured'
  });

  const { products, loading: productsLoading, error: productsError, refetch } = useSanityProducts('table');

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      q: '',
      shape: '',
      finish: '',
      sort: 'featured'
    });
  };

  const legStyles = [
    {
      style: "Classic Turned Legs",
      description: "Traditional woodturning creates elegant curves and proportions. Timeless design that complements any interior.",
      characteristics: ["Hand-turned profiles", "Elegant tapered design", "Traditional proportions", "Suitable for formal and casual settings"],
      bestFor: "Traditional, transitional, and farmhouse styles",
      height: "Standard 72cm dining height",
      icon: AccountBalance
    },
    {
      style: "Modern Hairpin Legs",
      description: "Contemporary steel-reinforced oak legs with clean lines. Perfect for modern and industrial aesthetics.",
      characteristics: ["Minimalist design", "Steel reinforcement", "Space-saving profile", "Easy to install"],
      bestFor: "Modern, industrial, and Scandinavian styles",
      height: "Available in multiple heights",
      icon: StraightenRounded
    },
    {
      style: "Rustic Farmhouse Legs", 
      description: "Chunky, substantial legs with character. Hand-distressed finish for authentic farmhouse appeal.",
      characteristics: ["Thick, sturdy construction", "Distressed finish", "Visible wood character", "Mortise and tenon joinery"],
      bestFor: "Farmhouse, rustic, and country styles",
      height: "Standard 75cm for farmhouse tables",
      icon: Cabin
    },
    {
      style: "Pedestal Bases",
      description: "Single central support for maximum legroom. Available in traditional and contemporary designs.",
      characteristics: ["Maximum legroom", "Single point support", "Heavy-duty construction", "Various top attachment options"],
      bestFor: "Conference tables, round dining tables",
      height: "Custom heights available",
      icon: Architecture
    }
  ];

  const heightGuide = [
    {
      use: "Standard Dining Table",
      height: "72cm",
      description: "Most common height for dining tables. Comfortable with standard dining chairs (45cm seat height).",
      chairHeight: "43-48cm seat height"
    },
    {
      use: "Counter Height Table",
      height: "86cm", 
      description: "Perfect for kitchen islands and casual dining. Use with counter-height stools.",
      chairHeight: "58-63cm seat height"
    },
    {
      use: "Bar Height Table",
      height: "106cm",
      description: "Ideal for bar-style seating and socializing. Requires bar-height stools.",
      chairHeight: "73-78cm seat height"
    },
    {
      use: "Coffee Table",
      height: "40-45cm",
      description: "Low height for living room seating. Should be same height or slightly lower than sofa seat.",
      chairHeight: "Sofa height dependent"
    }
  ];

  const installationTips = [
    {
      tip: "Measure Twice, Install Once",
      description: "Always verify tabletop dimensions and desired final height before ordering legs.",
      importance: "Critical"
    },
    {
      tip: "Consider Weight Distribution",
      description: "Heavier tabletops need more substantial legs. We provide weight capacity ratings for each leg style.",
      importance: "Important"
    },
    {
      tip: "Level Your Surface",
      description: "Ensure your floor is level or use adjustable feet to prevent wobbling.",
      importance: "Essential"
    },
    {
      tip: "Choose Appropriate Hardware",
      description: "We provide mounting hardware, but tabletop thickness affects screw length requirements.",
      importance: "Critical"
    }
  ];

  const legCompatibility = [
    {
      tabletopSize: "Up to 120cm round or 150x80cm rectangular",
      recommendedLegs: "4 Classic Turned Legs or Modern Hairpin",
      notes: "Standard 4-leg support provides excellent stability"
    },
    {
      tabletopSize: "120-150cm round or 180x90cm rectangular", 
      recommendedLegs: "4 Rustic Farmhouse Legs or Pedestal Base",
      notes: "Larger tops need substantial support or central pedestal"
    },
    {
      tabletopSize: "150cm+ round or 200x100cm+ rectangular",
      recommendedLegs: "Heavy-duty Pedestal Base or 6 Legs",
      notes: "Very large tops require maximum support for safety"
    },
    {
      tabletopSize: "Live Edge Slabs (variable)",
      recommendedLegs: "Custom consultation recommended",
      notes: "Irregular shapes need specialized mounting solutions"
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
              Oak Table Legs & Bases
            </h1>
            <p className="text-xl text-oak-200 max-w-3xl mx-auto mb-8">
              Handcrafted solid oak table legs in traditional and contemporary styles. 
              From elegant turned legs to robust farmhouse designs, find the perfect support for your tabletop.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Shop Table Legs
              </button>
              <button
                onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Selection Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="form-label">Search Table Legs</label>
              <input
                type="text"
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                placeholder="Search table legs..."
                className="form-control"
              />
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

            {/* Placeholder for future filter */}
            <div>
              <label className="form-label">Style</label>
              <select
                value={filters.shape}
                onChange={(e) => handleFilterChange('shape', e.target.value)}
                className="form-control"
              >
                <option value="">All Styles</option>
                <option value="turned">Classic Turned</option>
                <option value="hairpin">Modern Hairpin</option>
                <option value="farmhouse">Rustic Farmhouse</option>
                <option value="pedestal">Pedestal Base</option>
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

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-oak-600">
              {products.length > 0 && `Showing ${products.length} table legs`}
            </div>
            <button
              onClick={clearFilters}
              className="text-oak-600 hover:text-oak-800 text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-square bg-oak-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-oak-200 rounded mb-2"></div>
                    <div className="h-3 bg-oak-200 rounded mb-3 w-2/3"></div>
                    <div className="h-3 bg-oak-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : productsError ? (
            <ErrorMessage message={productsError} onRetry={refetch} />
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: SanityProduct) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-oak-50 flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-oak-400 text-4xl">🪵</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-oak-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-oak-600 mb-2">{product.category}</p>
                    <div className="text-xl font-bold text-oak-800 mb-2">
                      {product.price ? `€${product.price.toFixed(2)}` : 'Price on Request'}
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="w-full text-center bg-oak-600 text-white px-4 py-2 rounded-lg hover:bg-oak-700 transition-colors text-sm block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🪵</div>
              <h3 className="text-lg font-semibold text-oak-800 mb-2">No table legs found</h3>
              <p className="text-oak-600">Check back soon for our table leg collection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Selection Guide */}
      <section className="py-16 bg-white" id="guide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-oak-800 mb-4">
              Table Leg Selection Guide
            </h2>
            <p className="text-lg text-oak-600 max-w-3xl mx-auto">
              Choose the perfect legs to complement your tabletop and match your style preferences.
            </p>
          </div>

          {/* Leg Styles */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-oak-800 mb-8 text-center">Leg Styles</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {legStyles.map((style, index) => (
                <div key={index} className="bg-oak-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="text-4xl mr-4 mt-1 text-oak-600">
                      <style.icon sx={{ fontSize: 48 }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-oak-800 mb-2">{style.style}</h4>
                      <p className="text-oak-600 mb-4">{style.description}</p>
                      
                      <div className="mb-3">
                        <h5 className="font-semibold text-oak-800 mb-2">Key Features:</h5>
                        <ul className="space-y-1 text-sm text-oak-600">
                          {style.characteristics.map((char, i) => (
                            <li key={i} className="flex items-center">
                              <span className="text-amber-600 mr-2">•</span>
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-sm">
                        <div className="mb-1">
                          <span className="font-semibold text-oak-800">Best for:</span> {style.bestFor}
                        </div>
                        <div>
                          <span className="font-semibold text-oak-800">Height:</span> {style.height}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Height Guide */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-oak-800 mb-8 text-center">Height Selection Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heightGuide.map((guide, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-oak-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {guide.height.replace('cm', '')}
                    </div>
                    <h4 className="text-lg font-bold text-oak-800">{guide.use}</h4>
                  </div>
                  <p className="text-oak-600 mb-3">{guide.description}</p>
                  <div className="text-sm">
                    <span className="font-semibold text-oak-800">Seat Height:</span> {guide.chairHeight}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility Guide */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-oak-800 mb-8 text-center">Tabletop Compatibility</h3>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-oak-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Tabletop Size</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Recommended Legs</th>
                      <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {legCompatibility.map((compat, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 text-sm text-oak-800">{compat.tabletopSize}</td>
                        <td className="px-6 py-4 text-sm font-medium text-oak-800">{compat.recommendedLegs}</td>
                        <td className="px-6 py-4 text-sm text-oak-600">{compat.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Installation Tips */}
          <div>
            <h3 className="text-3xl font-bold text-oak-800 mb-8 text-center">Installation Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {installationTips.map((tip, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 mt-1 ${
                      tip.importance === 'Critical' ? 'bg-red-600' : 
                      tip.importance === 'Important' ? 'bg-amber-600' : 'bg-green-600'
                    }`}>
                      {tip.importance === 'Critical' ? '!' : 
                       tip.importance === 'Important' ? '△' : '✓'}
                    </div>
                    <div>
                      <h4 className="font-bold text-oak-800 mb-2">{tip.tip}</h4>
                      <p className="text-oak-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-oak-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oak-800 mb-4">Complete Table Solutions</h2>
            <p className="text-lg text-oak-600">We offer more than just table legs - complete your dining table project with our services.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-oak-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Build sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl font-bold text-oak-800 mb-3">Professional Installation</h3>
              <p className="text-oak-600 mb-4">
                Our craftsmen can install your table legs professionally, ensuring perfect alignment and stability.
              </p>
              <Link href="/contact" className="text-oak-600 hover:text-oak-800 font-medium">
                Request Installation →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-oak-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <StraightenSharp sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl font-bold text-oak-800 mb-3">Custom Heights</h3>
              <p className="text-oak-600 mb-4">
                Need non-standard heights? We can customize any leg style to your exact specifications.
              </p>
              <Link href="/contact" className="text-oak-600 hover:text-oak-800 font-medium">
                Request Custom Quote →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-oak-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Construction sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl font-bold text-oak-800 mb-3">Hardware Included</h3>
              <p className="text-oak-600 mb-4">
                Every set of legs includes appropriate mounting hardware and detailed installation instructions.
              </p>
              <Link href="/contact" className="text-oak-600 hover:text-oak-800 font-medium">
                Installation Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-oak-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Complete Your Table Project
          </h2>
          <p className="text-xl text-oak-200 mb-8 max-w-2xl mx-auto">
            Browse our tabletops to find the perfect match for your chosen legs, 
            or contact us for a custom table solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/categories/tabletops"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Tabletops
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Custom Table Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}