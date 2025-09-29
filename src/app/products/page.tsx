'use client';

import { useSanityProducts, useSanityCategories } from '../../hooks/sanity';
import Link from 'next/link';

export default function ProductsPage() {
  const { products, loading: productsLoading, error: productsError } = useSanityProducts();
  const { categories, loading: categoriesLoading } = useSanityCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-oak-800 mb-4">
              Oak Furniture Collection
            </h1>
            <p className="text-lg text-oak-600 max-w-3xl mx-auto">
              Discover our complete range of handcrafted solid oak furniture. 
              Each piece is sustainably sourced and expertly crafted for lasting beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-xl font-semibold text-oak-800 mb-4">Categories</h2>
          {categoriesLoading ? (
            <div className="flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-oak-100 rounded-lg px-4 py-2 animate-pulse w-24 h-10"></div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Link
                href="/products"
                className="bg-oak-600 text-white px-4 py-2 rounded-lg hover:bg-oak-700 transition-colors"
              >
                All Products
              </Link>
              {categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/products?category=${category.name}`}
                  className="bg-oak-100 text-oak-800 px-4 py-2 rounded-lg hover:bg-oak-200 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
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
            <div className="text-center py-16">
              <div className="text-red-600 mb-4">
                <p className="text-xl font-semibold">Error loading products</p>
                <p className="text-sm">{productsError}</p>
              </div>
              <p className="text-oak-600">Please check that Sanity CMS is running on port 3333</p>
              <Link
                href="/sanity-test"
                className="inline-block mt-4 bg-oak-600 text-white px-6 py-2 rounded-lg hover:bg-oak-700 transition-colors"
              >
                Test Connection
              </Link>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
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
                    {product.specifications?.dimensions && (
                      <p className="text-xs text-oak-500 mb-3">
                        {product.category === 'table' && product.tableShape === 'rectangular' && (
                          <>L{product.specifications.dimensions.length} × W{product.specifications.dimensions.width} × H{product.specifications.dimensions.height}cm</>
                        )}
                        {product.category === 'table' && product.tableShape === 'oval' && (
                          <>⌀{product.specifications.dimensions.diameter} × D{product.specifications.dimensions.depth} × H{product.specifications.dimensions.height}cm</>
                        )}
                        {product.category !== 'table' && (
                          <>L{product.specifications.dimensions.genericLength} × W{product.specifications.dimensions.genericWidth} × H{product.specifications.dimensions.genericHeight}cm</>
                        )}
                      </p>
                    )}
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-block bg-oak-600 text-white px-4 py-2 rounded-lg hover:bg-oak-700 transition-colors text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-oak-600 mb-4">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p>Create some products in your Sanity Studio to see them here.</p>
              </div>
              <Link
                href="http://localhost:3333"
                target="_blank"
                className="inline-block bg-oak-600 text-white px-6 py-2 rounded-lg hover:bg-oak-700 transition-colors"
              >
                Open Sanity Studio
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}