// Enhanced hooks with sorting and filtering capabilities
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { sanityApi } from '../lib/sanity';
import { 
  sortProducts, 
  sortBlogPosts, 
  filterProducts, 
  filterBlogPosts,
  type SortOptions,
  type ProductFilters,
  type BlogFilters,
  PRODUCT_SORT_OPTIONS,
  BLOG_SORT_OPTIONS
} from '../lib/sorting';

// Hook for enhanced product management with sorting and filtering
export function useProductManager() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [sortOptions, setSortOptions] = useState<SortOptions>(PRODUCT_SORT_OPTIONS[0]);
  const [filters, setFilters] = useState<ProductFilters>({});

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await sanityApi.getAllProducts();
      if (result && Array.isArray(result)) {
        setAllProducts(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters and sorting
  const processedProducts = useMemo(() => {
    let processed = filterProducts(allProducts, filters);
    processed = sortProducts(processed, sortOptions);
    return processed;
  }, [allProducts, filters, sortOptions]);

  // Update filtered products when processing changes
  useEffect(() => {
    setFilteredProducts(processedProducts);
  }, [processedProducts]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products: filteredProducts,
    allProducts,
    loading,
    error,
    sortOptions,
    filters,
    setSortOptions,
    setFilters: (newFilters: Partial<ProductFilters>) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
    },
    clearFilters: () => setFilters({}),
    refetch: fetchProducts,
    totalCount: allProducts.length,
    filteredCount: filteredProducts.length
  };
}

// Hook for enhanced blog post management with sorting and filtering
export function useBlogManager() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [sortOptions, setSortOptions] = useState<SortOptions>(BLOG_SORT_OPTIONS[0]);
  const [filters, setFilters] = useState<BlogFilters>({});

  // Fetch all blog posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await sanityApi.getBlogPosts();
      if (result && Array.isArray(result)) {
        setAllPosts(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog posts';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters and sorting
  const processedPosts = useMemo(() => {
    let processed = filterBlogPosts(allPosts, filters);
    processed = sortBlogPosts(processed, sortOptions);
    return processed;
  }, [allPosts, filters, sortOptions]);

  // Update filtered posts when processing changes
  useEffect(() => {
    setFilteredPosts(processedPosts);
  }, [processedPosts]);

  // Initial load
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts: filteredPosts,
    allPosts,
    loading,
    error,
    sortOptions,
    filters,
    setSortOptions,
    setFilters: (newFilters: Partial<BlogFilters>) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
    },
    clearFilters: () => setFilters({}),
    refetch: fetchPosts,
    totalCount: allPosts.length,
    filteredCount: filteredPosts.length
  };
}

// Hook for category-specific products with enhanced features
export function useCategoryProducts(categoryType?: string, categorySlug?: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [sortOptions, setSortOptions] = useState<SortOptions>(PRODUCT_SORT_OPTIONS[0]);
  const [additionalFilters, setAdditionalFilters] = useState<Omit<ProductFilters, 'categoryType' | 'categorySlug'>>({});

  // Fetch products based on category
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      if (categorySlug) {
        result = await sanityApi.getProductsByCategory(categorySlug);
      } else if (categoryType) {
        result = await sanityApi.getProductsByCategoryType(categoryType);
      } else {
        result = await sanityApi.getAllProducts();
      }
      
      if (result && Array.isArray(result)) {
        setProducts(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [categoryType, categorySlug]);

  // Apply additional filters and sorting
  const processedProducts = useMemo(() => {
    let processed = filterProducts(products, additionalFilters);
    processed = sortProducts(processed, sortOptions);
    return processed;
  }, [products, additionalFilters, sortOptions]);

  // Initial load and reload when category changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products: processedProducts,
    rawProducts: products,
    loading,
    error,
    sortOptions,
    filters: additionalFilters,
    setSortOptions,
    setFilters: (newFilters: Partial<Omit<ProductFilters, 'categoryType' | 'categorySlug'>>) => {
      setAdditionalFilters(prev => ({ ...prev, ...newFilters }));
    },
    clearFilters: () => setAdditionalFilters({}),
    refetch: fetchProducts,
    totalCount: products.length,
    filteredCount: processedProducts.length
  };
}

// Hook for category-specific blog posts with enhanced features
export function useCategoryBlogPosts(categorySlug?: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [sortOptions, setSortOptions] = useState<SortOptions>(BLOG_SORT_OPTIONS[0]);
  const [additionalFilters, setAdditionalFilters] = useState<Omit<BlogFilters, 'categorySlug'>>({});

  // Fetch posts based on category
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      if (categorySlug) {
        result = await sanityApi.getBlogPostsByCategory(categorySlug);
      } else {
        result = await sanityApi.getBlogPosts();
      }
      
      if (result && Array.isArray(result)) {
        setPosts(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog posts';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [categorySlug]);

  // Apply additional filters and sorting
  const processedPosts = useMemo(() => {
    let processed = filterBlogPosts(posts, additionalFilters);
    processed = sortBlogPosts(processed, sortOptions);
    return processed;
  }, [posts, additionalFilters, sortOptions]);

  // Initial load and reload when category changes
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts: processedPosts,
    rawPosts: posts,
    loading,
    error,
    sortOptions,
    filters: additionalFilters,
    setSortOptions,
    setFilters: (newFilters: Partial<Omit<BlogFilters, 'categorySlug'>>) => {
      setAdditionalFilters(prev => ({ ...prev, ...newFilters }));
    },
    clearFilters: () => setAdditionalFilters({}),
    refetch: fetchPosts,
    totalCount: posts.length,
    filteredCount: processedPosts.length
  };
}

// Hook for testimonial management (internal B2C/B2B filtering)
export function useTestimonialManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testimonialType, setTestimonialType] = useState<'all' | 'B2C' | 'B2B'>('all');

  // Fetch testimonials
  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      if (testimonialType === 'all') {
        result = await sanityApi.getTestimonials();
      } else {
        result = await sanityApi.getTestimonialsByType(testimonialType);
      }
      
      if (result && Array.isArray(result)) {
        setTestimonials(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch testimonials';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [testimonialType]);

  // Reload when testimonial type changes
  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return {
    testimonials,
    loading,
    error,
    testimonialType,
    setTestimonialType,
    refetch: fetchTestimonials,
    totalCount: testimonials.length
  };
}