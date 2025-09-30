'use client';

import { useSanityProduct } from '../../../hooks/sanity';
import { useSanityProducts } from '../../../hooks/sanity';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

interface ProductClientProps {
  productId: string;
}

export default function ProductClient({ productId }: ProductClientProps) {
  const { product, loading, error } = useSanityProduct(productId);
  const { products: relatedProducts } = useSanityProducts(product?.category);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Debug logging
  useEffect(() => {
    console.log('ProductClient Debug:', {
      productId,
      product,
      loading,
      error
    });
  }, [productId, product, loading, error]);

  // If product is not found and not loading, show 404
  useEffect(() => {
    if (!loading && !product && !error) {
      console.log('Product not found, calling notFound()');
      // notFound(); // Temporarily disabled for debugging
    }
  }, [loading, product, error]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('wood_good_cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images?.[0] || null,
        category: product.category
      });
    }

    localStorage.setItem('wood_good_cart', JSON.stringify(cart));
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb skeleton */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <div className="bg-oak-200 rounded w-16 h-4 animate-pulse"></div>
              <span className="text-oak-400">/</span>
              <div className="bg-oak-200 rounded w-20 h-4 animate-pulse"></div>
              <span className="text-oak-400">/</span>
              <div className="bg-oak-200 rounded w-24 h-4 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product images skeleton */}
            <div>
              <div className="aspect-square bg-oak-200 rounded-lg mb-4 animate-pulse"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-oak-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Product info skeleton */}
            <div>
              <div className="bg-oak-200 rounded w-3/4 h-8 mb-4 animate-pulse"></div>
              <div className="bg-oak-200 rounded w-1/4 h-6 mb-6 animate-pulse"></div>
              <div className="bg-oak-200 rounded w-full h-20 mb-6 animate-pulse"></div>
              <div className="bg-oak-200 rounded w-1/3 h-10 mb-6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <p className="text-xl font-semibold">Error loading product</p>
            <p className="text-sm">{error}</p>
          </div>
          <Link
            href="/products"
            className="inline-block bg-oak-600 text-white px-6 py-2 rounded-lg hover:bg-oak-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Debug Information</h1>
          <div className="text-left">
            <p><strong>Product ID:</strong> {productId}</p>
            <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
            <p><strong>Error:</strong> {error || 'none'}</p>
            <p><strong>Product:</strong> {product ? 'found' : 'not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const relatedProductsFiltered = relatedProducts
    ?.filter((p: any) => p.id !== product.id)
    ?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-oak-600">
            <Link href="/" className="hover:text-oak-800">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-oak-800">Products</Link>
            <span>/</span>
            <span className="text-oak-800 font-medium">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main image */}
            <div className="aspect-square bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.imageAlts?.[selectedImageIndex] || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-oak-50 text-oak-400 text-6xl">
                  🪵
                </div>
              )}
            </div>

            {/* Thumbnail images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index 
                        ? 'border-oak-600' 
                        : 'border-gray-200 hover:border-oak-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={product.imageAlts?.[index] || `${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-bold text-oak-800 mb-4">{product.name}</h1>
            
            {/* Category */}
            <div className="mb-4">
              <Link
                href={`/products?category=${product.category}`}
                className="inline-block bg-oak-100 text-oak-800 px-3 py-1 rounded-full text-sm hover:bg-oak-200 transition-colors"
              >
                {product.category}
              </Link>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-oak-800 mb-6">
              {product.price ? `€${product.price.toFixed(2)}` : 'Price on Request'}
            </div>

            {/* Description */}
            {product.detailedDescription && Array.isArray(product.detailedDescription) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-oak-800 mb-2">Description</h3>
                <div className="text-oak-600 leading-relaxed">
                  {product.detailedDescription.map((block: any, index: number) => {
                    if (block._type === 'block' && block.children) {
                      return (
                        <p key={block._key || index} className="mb-2">
                          {block.children.map((child: any) => child.text).join('')}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-oak-800 mb-3">Specifications</h3>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Dimensions */}
                    {product.specifications.dimensions && (
                      <div>
                        <h4 className="font-medium text-oak-800 mb-1">Dimensions</h4>
                        <div className="text-sm text-oak-600">
                          {product.category === 'table' && product.tableShape === 'rectangular' && (
                            <p>L{product.specifications.dimensions.length} × W{product.specifications.dimensions.width} × H{product.specifications.dimensions.height}cm</p>
                          )}
                          {product.category === 'table' && product.tableShape === 'oval' && (
                            <p>⌀{product.specifications.dimensions.diameter} × D{product.specifications.dimensions.depth} × H{product.specifications.dimensions.height}cm</p>
                          )}
                          {product.category !== 'table' && (
                            <p>L{product.specifications.dimensions.genericLength} × W{product.specifications.dimensions.genericWidth} × H{product.specifications.dimensions.genericHeight}cm</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Weight */}
                    {product.specifications.weight && (
                      <div>
                        <h4 className="font-medium text-oak-800 mb-1">Weight</h4>
                        <p className="text-sm text-oak-600">{product.specifications.weight}kg</p>
                      </div>
                    )}

                    {/* Color */}
                    {product.specifications.color && (
                      <div>
                        <h4 className="font-medium text-oak-800 mb-1">Color</h4>
                        <p className="text-sm text-oak-600">{product.specifications.color}</p>
                      </div>
                    )}

                    {/* Finish */}
                    {product.specifications.finish && (
                      <div>
                        <h4 className="font-medium text-oak-800 mb-1">Finish</h4>
                        <p className="text-sm text-oak-600">{product.specifications.finish}</p>
                      </div>
                    )}

                    {/* Leg Shape (for tables) */}
                    {product.specifications.legShape && (
                      <div>
                        <h4 className="font-medium text-oak-800 mb-1">Leg Shape</h4>
                        <p className="text-sm text-oak-600">{product.specifications.legShape}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Care Instructions */}
            {product.careInstructions && Array.isArray(product.careInstructions) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-oak-800 mb-2">Care Instructions</h3>
                <ul className="text-oak-600 text-sm leading-relaxed list-disc list-inside space-y-1">
                  {product.careInstructions.map((instruction: string, index: number) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart Section */}
            {product.price && product.inStock && (
              <div className="border-t pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-oak-800 mb-1">
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="border border-oak-300 rounded px-3 py-2 text-oak-800 focus:outline-none focus:ring-2 focus:ring-oak-500"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-oak-600 text-white px-6 py-3 rounded-lg hover:bg-oak-700 transition-colors font-medium"
                >
                  Add to Cart - €{(product.price * quantity).toFixed(2)}
                </button>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 border border-oak-600 text-oak-800 px-6 py-2 rounded-lg hover:bg-oak-50 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href="/contact"
                    className="flex-1 text-center border border-oak-300 text-oak-800 px-6 py-2 rounded-lg hover:bg-oak-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}

            {/* Out of Stock */}
            {!product.inStock && (
              <div className="border-t pt-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800 font-medium">Currently Out of Stock</p>
                  <p className="text-red-600 text-sm mt-1">Contact us for availability and custom orders.</p>
                </div>
                <Link
                  href="/contact"
                  className="w-full inline-block text-center bg-oak-600 text-white px-6 py-3 rounded-lg hover:bg-oak-700 transition-colors font-medium"
                >
                  Contact for Availability
                </Link>
              </div>
            )}

            {/* No Price (Price on Request) */}
            {!product.price && (
              <div className="border-t pt-6">
                <div className="bg-oak-50 border border-oak-200 rounded-lg p-4 mb-4">
                  <p className="text-oak-800 font-medium">Custom Pricing</p>
                  <p className="text-oak-600 text-sm mt-1">Contact us for a personalized quote for this item.</p>
                </div>
                <Link
                  href="/contact"
                  className="w-full inline-block text-center bg-oak-600 text-white px-6 py-3 rounded-lg hover:bg-oak-700 transition-colors font-medium"
                >
                  Request Quote
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProductsFiltered.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-oak-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProductsFiltered.map((relatedProduct: any) => (
                <Link
                  key={relatedProduct._id}
                  href={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-oak-50 flex items-center justify-center">
                    {relatedProduct.images && relatedProduct.images.length > 0 ? (
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-oak-400 text-3xl">🪵</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-oak-800 mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-oak-600 mb-2">{relatedProduct.category}</p>
                    <div className="text-lg font-bold text-oak-800">
                      {relatedProduct.price ? `€${relatedProduct.price.toFixed(2)}` : 'Price on Request'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}