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

// Hook for fetching categories from Sanity
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
export function useSanityProducts(category?: string) {
  const [products, setProducts] = useState<any[]>([]);
  const { loading, error, execute } = useSanityLoading();

  const fetchProducts = useCallback(async () => {
    const result = await execute(() => 
      category ? sanityApi.getProductsByCategory(category) : sanityApi.getAllProducts()
    );
    if (result && Array.isArray(result)) {
      setProducts(result);
    }
  }, [execute, category]);

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