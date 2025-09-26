// Reusable UI components for Wood & Good E-commerce
'use client';

import React from 'react';
import Link from 'next/link';
import { Product, Category, BlogPost } from '../types';

// Loading Spinner Component
export function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-2 border-amber-200 border-t-amber-600 ${sizeClasses[size]}`}></div>
    </div>
  );
}

// Error Message Component
export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      <p className="mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
  addingToCart?: boolean;
}

export function ProductCard({ product, onAddToCart, addingToCart = false }: ProductCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('lv-LV', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.seo_slug}`}>
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-amber-50">
              <div className="text-amber-600 text-4xl">🪵</div>
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded text-sm font-medium">
              Featured
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.seo_slug}`}>
          <h3 className="font-semibold text-gray-900 mb-1 hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2">{product.wood_type}</p>
        
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>
          
          {onAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
              className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 
                         disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {addingToCart ? (
                <LoadingSpinner size="small" />
              ) : product.stock === 0 ? (
                'Out of Stock'
              ) : (
                'Add to Cart'
              )}
            </button>
          )}
        </div>
        
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-sm text-orange-600 mt-2">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}

// Product Grid Component
interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string;
  onAddToCart?: (productId: number) => void;
  addingToCartId?: number;
  onRetry?: () => void;
}

export function ProductGrid({ 
  products, 
  loading, 
  error, 
  onAddToCart, 
  addingToCartId, 
  onRetry 
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-3 w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded mb-3"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🪵</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          addingToCart={addingToCartId === product.id}
        />
      ))}
    </div>
  );
}

// Category Card Component
interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-200 relative overflow-hidden">
          {category.image_url ? (
            <img
              src={category.image_url}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-amber-600 text-6xl">🪑</div>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-colors"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold text-xl mb-1">{category.name}</h3>
            {category.description && (
              <p className="text-sm opacity-90 line-clamp-2">{category.description}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Blog Post Card Component
interface BlogPostCardProps {
  post: Partial<BlogPost>;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          {post.featured_image ? (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-amber-50">
              <div className="text-amber-600 text-4xl">📝</div>
            </div>
          )}
          {post.category && (
            <div className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded text-sm font-medium">
              {post.category}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            {post.author && <span>By {post.author}</span>}
            {post.created_at && <span>{formatDate(post.created_at)}</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function Pagination({ currentPage, totalPages, onPageChange, loading = false }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5; // Show 5 page numbers
  
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);
  
  // Adjust start page if we're near the end
  if (endPage - startPage < showPages - 1) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 
                   hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={loading}
          className={`px-3 py-2 rounded-md border ${
            page === currentPage
              ? 'bg-amber-600 border-amber-600 text-white'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } disabled:opacity-50`}
        >
          {page}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 
                   hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}