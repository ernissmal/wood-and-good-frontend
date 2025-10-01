// React hooks for Sanity CMS integration
'use client';

import { useState, useEffect, useCallback } from 'react';
import { sanityApi } from '../lib/sanity';

// Hook for managing loading states
export function useSanityLoading() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, execute };
}

// Hook for fetching product categories from Sanity
export function useSanityProductCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchCategories = useCallback(async () => {
    const result = await execute(() => sanityApi.getAllProductCategories());
    if (result && Array.isArray(result)) {
      setCategories(result);
    }
  }, [execute]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

// Hook for fetching product categories by type (tables, table-legs, other)
export function useSanityProductCategoriesByType(categoryType: string) {
  const [categories, setCategories] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchCategories = useCallback(async () => {
    const result = await execute(() => sanityApi.getProductCategoriesByType(categoryType));
    if (result && Array.isArray(result)) {
      setCategories(result);
    }
  }, [execute, categoryType]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

// Hook for fetching blog categories from Sanity
export function useSanityBlogCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchCategories = useCallback(async () => {
    const result = await execute(() => sanityApi.getAllBlogCategories());
    if (result && Array.isArray(result)) {
      setCategories(result);
    }
  }, [execute]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

// Legacy hook for backward compatibility
export function useSanityCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchCategories = useCallback(async () => {
    const result = await execute(() => sanityApi.getAllCategories());
    if (result && Array.isArray(result)) {
      setCategories(result);
    }
  }, [execute]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

// Hook for fetching all products from Sanity
export function useSanityProducts(categorySlug?: string) {
  const [products, setProducts] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchProducts = useCallback(async () => {
    const result = await execute(() => 
      categorySlug ? sanityApi.getProductsByCategory(categorySlug) : sanityApi.getAllProducts()
    );
    if (result && Array.isArray(result)) {
      setProducts(result);
    }
  }, [execute, categorySlug]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

// Hook for fetching products by category type (tables, table-legs, other)
export function useSanityProductsByCategoryType(categoryType: string) {
  const [products, setProducts] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchProducts = useCallback(async () => {
    const result = await execute(() => sanityApi.getProductsByCategoryType(categoryType));
    if (result && Array.isArray(result)) {
      setProducts(result);
    }
  }, [execute, categoryType]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

// Hook for fetching featured products from Sanity
export function useSanityFeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchFeaturedProducts = useCallback(async () => {
    const result = await execute(() => sanityApi.getFeaturedProducts());
    if (result && Array.isArray(result)) {
      setProducts(result);
    }
  }, [execute]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return { products, loading, error, refetch: fetchFeaturedProducts };
}

// Hook for fetching a single product from Sanity
export function useSanityProduct(productId: string | null) {
  const [product, setProduct] = useState<any | null>(null);
  const { loading, error, execute } = useSanityLoading();

  const fetchProduct = useCallback(async () => {
    if (!productId) return;
    const result = await execute(() => sanityApi.getProductById(productId));
    if (result) {
      setProduct(result);
    }
  }, [productId, execute]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [fetchProduct, productId]);

  return { product, loading, error, refetch: fetchProduct };
}

// Hook for fetching blog posts from Sanity
export function useSanityBlogPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchPosts = useCallback(async () => {
    const result = await execute(() => sanityApi.getBlogPosts());
    if (result && Array.isArray(result)) {
      setPosts(result);
    }
  }, [execute]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}

// Hook for fetching blog posts by category
export function useSanityBlogPostsByCategory(categorySlug: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchPosts = useCallback(async () => {
    const result = await execute(() => sanityApi.getBlogPostsByCategory(categorySlug));
    if (result && Array.isArray(result)) {
      setPosts(result);
    }
  }, [execute, categorySlug]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}

// Hook for fetching blog posts by category type (for internal categorization)
export function useSanityBlogPostsByCategoryType(categoryType: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchPosts = useCallback(async () => {
    const result = await execute(() => sanityApi.getBlogPostsByCategoryType(categoryType));
    if (result && Array.isArray(result)) {
      setPosts(result);
    }
  }, [execute, categoryType]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}

// Hook for fetching featured blog posts from Sanity
export function useSanityFeaturedBlogPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchFeaturedPosts = useCallback(async () => {
    const result = await execute(() => sanityApi.getBlogPosts());
    if (result && Array.isArray(result)) {
      // For now, just take the first 3 posts as "featured"
      setPosts(result.slice(0, 3));
    }
  }, [execute]);

  useEffect(() => {
    fetchFeaturedPosts();
  }, [fetchFeaturedPosts]);

  return { posts, loading, error, refetch: fetchFeaturedPosts };
}

// Hook for fetching a single blog post from Sanity
export function useSanityBlogPost(slug: string | null) {
  const [post, setPost] = useState<any | null>(null);
  const { loading, error, execute } = useSanityLoading();

  const fetchPost = useCallback(async () => {
    if (!slug) return;
    const result = await execute(() => sanityApi.getBlogPost(slug));
    if (result) {
      setPost(result);
    }
  }, [slug, execute]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [fetchPost, slug]);

  return { post, loading, error, refetch: fetchPost };
}

// Hook for fetching testimonials from Sanity
export function useSanityTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchTestimonials = useCallback(async () => {
    const result = await execute(() => sanityApi.getTestimonials());
    if (result && Array.isArray(result)) {
      setTestimonials(result);
    }
  }, [execute]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return { testimonials, loading, error, refetch: fetchTestimonials };
}

// Hook for fetching testimonials by type (B2C or B2B - for internal use only)
export function useSanityTestimonialsByType(testimonialType: 'B2C' | 'B2B') {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchTestimonials = useCallback(async () => {
    const result = await execute(() => sanityApi.getTestimonialsByType(testimonialType));
    if (result && Array.isArray(result)) {
      setTestimonials(result);
    }
  }, [execute, testimonialType]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return { testimonials, loading, error, refetch: fetchTestimonials };
}

// Hook for fetching featured testimonials from Sanity
export function useSanityFeaturedTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchFeaturedTestimonials = useCallback(async () => {
    const result = await execute(() => sanityApi.getFeaturedTestimonials());
    if (result && Array.isArray(result)) {
      setTestimonials(result);
    }
  }, [execute]);

  useEffect(() => {
    fetchFeaturedTestimonials();
  }, [fetchFeaturedTestimonials]);

  return { testimonials, loading, error, refetch: fetchFeaturedTestimonials };
}