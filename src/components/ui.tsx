// Enhanced UI components for The Wood and Good E-commerce with Material Icons
'use client';

import React from 'react';
import Link from 'next/link';
import { Product, Category, BlogPost } from '@/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Enhanced Loading Spinner Component
export function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`animate-spin rounded-full border-2 border-oak-200 border-t-oak-500 ${sizeClasses[size]}`}></div>
    </div>
  );
}

// Enhanced Error Message Component
export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 flex items-start space-x-3">
      <ErrorOutlineIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium mb-2">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <RefreshIcon className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
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
    <div className="furniture-card group">
      <Link href={`/products/${product.seo_slug}`}>
        <div className="aspect-square bg-oak-50 relative overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-oak-100 text-oak-600">
              <InventoryIcon sx={{ fontSize: 48 }} />
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-oak-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <StarIcon className="w-4 h-4" />
              <span>Featured</span>
            </div>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-oak-50 transition-colors">
              <FavoriteIcon className="w-5 h-5 text-oak-600" />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <Link href={`/products/${product.seo_slug}`}>
          <h3 className="font-semibold text-textPrimary mb-2 hover:text-oak-600 transition-colors text-lg">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-2 mb-3">
          <LocalOfferIcon className="w-4 h-4 text-oak-600" />
          <p className="text-sm text-oak-600 font-medium">{product.wood_type || 'Oak Wood'}</p>
        </div>
        
        <p className="text-textSecondary text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-textPrimary">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              className="w-10 h-10 bg-oak-100 hover:bg-oak-200 rounded-lg flex items-center justify-center transition-colors duration-200"
              title="Quick View"
            >
              <VisibilityIcon className="w-5 h-5 text-oak-600" />
            </button>
            
            {onAddToCart && (
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || (product.stock || product.stock_quantity) === 0}
                className="btn-primary text-sm px-4 py-2 flex items-center space-x-2 disabled:bg-neutral-400 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <LoadingSpinner size="small" />
                ) : (product.stock || product.stock_quantity) === 0 ? (
                  <span>Out of Stock</span>
                ) : (
                  <>
                    <ShoppingCartIcon className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        {((product.stock || product.stock_quantity) < 10 && (product.stock || product.stock_quantity) > 0) && (
          <div className="flex items-center space-x-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
            <ErrorOutlineIcon className="w-4 h-4" />
            <span>Only {product.stock || product.stock_quantity} left in stock!</span>
          </div>
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
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-oak-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <InventoryIcon sx={{ fontSize: 48 }} className="text-oak-600" />
        </div>
        <h3 className="text-xl font-semibold text-textPrimary mb-2">No products found</h3>
        <p className="text-textSecondary max-w-md mx-auto">
          Try adjusting your filters or search terms to find the perfect oak furniture for your home.
        </p>
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
interface SanityCategory {
  name: string;
  imageUrl?: string;
  image_url?: string;
  description?: string;
}

interface CategoryCardProps {
  category: SanityCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.name}`}>
      <div className="furniture-card group">
        <div className="aspect-video bg-oak-gradient relative overflow-hidden">
          {category.imageUrl || category.image_url ? (
            <img
              src={category.imageUrl || category.image_url}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <InventoryIcon sx={{ fontSize: 64 }} className="text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-colors duration-300"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="font-bold text-2xl mb-2 group-hover:text-oak-200 transition-colors">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm opacity-90 line-clamp-2 leading-relaxed max-w-sm">
                {category.description}
              </p>
            )}
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <VisibilityIcon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Blog Post Card Component
interface BlogPost {
  slug: { current: string } | string;
  imageUrl?: string;
  featured_image?: string;
  title: string;
  categories?: { title: string }[];
  publishedAt?: string;
  created_at?: string;
  author?: string;
  excerpt?: string;
  featured?: boolean;
}

interface BlogPostCardProps {
  post: BlogPost;
}
  );
}

// Blog Post Card Component
interface BlogPostCardProps {
  post: any; // Using any for Sanity data flexibility
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
    <Link href={`/blog/${post.slug?.current || post.slug}`}>
      <article className="furniture-card group">
        <div className="aspect-video bg-oak-50 relative overflow-hidden">
          {post.imageUrl || post.featured_image ? (
            <img
              src={post.imageUrl || post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-oak-100">
              <CalendarTodayIcon sx={{ fontSize: 48 }} className="text-oak-600" />
            </div>
          )}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-3 left-3 bg-oak-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <LocalOfferIcon className="w-3 h-3" />
              <span>{post.categories[0].title}</span>
            </div>
          )}
          {post.featured && (
            <div className="absolute top-3 right-3 bg-forest-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <StarIcon className="w-3 h-3" />
              <span>Featured</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-xl text-textPrimary mb-3 group-hover:text-oak-600 transition-colors leading-tight">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-textSecondary mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-oak-600 pt-4 border-t border-oak-200">
            {post.author && (
              <div className="flex items-center space-x-2">
                <PersonIcon className="w-4 h-4" />
                <span>By {post.author}</span>
              </div>
            )}
            {(post.publishedAt || post.created_at) && (
              <div className="flex items-center space-x-2">
                <CalendarTodayIcon className="w-4 h-4" />
                <span>{formatDate(post.publishedAt || post.created_at)}</span>
              </div>
            )}
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