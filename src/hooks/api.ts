// React hooks for The Wood and Good E-commerce API integration
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, Category, BlogPost, Cart, ApiResponse, PaginatedResponse } from '../types';
import { api } from '../lib/api';

// Hook for managing loading states
export function useLoading() {
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

// Hook for fetching categories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { loading, error, execute } = useLoading();

  const fetchCategories = useCallback(async () => {
    const result = await execute(() => api.getCategories()) as ApiResponse<Category[]> | null;
    if (result?.success && result.data) {
      setCategories(result.data);
    }
  }, [execute]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

// Hook for fetching products with filters
export function useProducts(filters?: {
  page?: number;
  limit?: number;
  category_id?: number;
  q?: string;
  shape?: string;
  finish?: string;
  min_price?: number;
  max_price?: number;
  sort?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const { loading, error, execute } = useLoading();

  const fetchProducts = useCallback(async () => {
    const result = await execute(() => api.getProducts(filters)) as PaginatedResponse<Product> | null;
    if (result?.success && result.data) {
      setProducts(result.data);
      setPagination({
        page: result.pagination?.page || 1,
        limit: result.pagination?.limit || 12,
        total: result.pagination?.total || 0,
        totalPages: result.pagination?.total_pages || 0,
      });
    }
  }, [execute, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, pagination, loading, error, refetch: fetchProducts };
}

// Hook for fetching featured products
export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, error, execute } = useLoading();

  const fetchFeaturedProducts = useCallback(async () => {
    const result = await execute(() => api.getFeaturedProducts()) as ApiResponse<Product[]> | null;
    if (result?.success && result.data) {
      setProducts(result.data);
    }
  }, [execute]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return { products, loading, error, refetch: fetchFeaturedProducts };
}

// Hook for fetching a single product
export function useProduct(slug: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const { loading, error, execute } = useLoading();

  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    const result = await execute(() => api.getProduct(slug)) as ApiResponse<Product> | null;
    if (result?.success && result.data) {
      setProduct(result.data);
    }
  }, [slug, execute]);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [fetchProduct, slug]);

  return { product, loading, error, refetch: fetchProduct };
}

// Hook for managing cart session ID
export function useCartSession() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Get or create cart session ID
    let cartSessionId = localStorage.getItem('cart_session_id');
    if (!cartSessionId) {
      cartSessionId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', cartSessionId);
    }
    setSessionId(cartSessionId);
  }, []);

  return sessionId;
}

// Hook for managing shopping cart
export function useCart() {
  const sessionId = useCartSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const { loading, error, execute } = useLoading();

  const fetchCart = useCallback(async () => {
    if (!sessionId) return;
    const result = await execute(() => api.getCart(sessionId)) as ApiResponse<Cart> | null;
    if (result?.success && result.data) {
      setCart(result.data);
    }
  }, [sessionId, execute]);

  const addToCart = useCallback(async (productId: number, quantity: number = 1, variantId?: number) => {
    if (!sessionId) return;
    const result = await execute(() => api.addToCart(sessionId, productId, quantity, variantId)) as ApiResponse<Cart> | null;
    if (result?.success && result.data) {
      setCart(result.data);
      return result.data;
    }
  }, [sessionId, execute]);

  const updateCartItem = useCallback(async (productId: number, quantity: number) => {
    if (!sessionId) return;
    const result = await execute(() => api.updateCartItem(sessionId, productId, quantity)) as ApiResponse<Cart> | null;
    if (result?.success && result.data) {
      setCart(result.data);
      return result.data;
    }
  }, [sessionId, execute]);

  const removeFromCart = useCallback(async (productId: number) => {
    if (!sessionId) return;
    const result = await execute(() => api.removeFromCart(sessionId, productId)) as ApiResponse<Cart> | null;
    if (result?.success && result.data) {
      setCart(result.data);
      return result.data;
    }
  }, [sessionId, execute]);

  const clearCart = useCallback(async () => {
    if (!sessionId) return;
    const result = await execute(() => api.clearCart(sessionId)) as ApiResponse<Cart> | null;
    if (result?.success && result.data) {
      setCart(result.data);
      return result.data;
    }
  }, [sessionId, execute]);

  useEffect(() => {
    if (sessionId) {
      fetchCart();
    }
  }, [fetchCart, sessionId]);

  return {
    cart,
    loading,
    error,
    sessionId,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refetch: fetchCart,
  };
}

// Hook for fetching blog posts
export function useBlogPosts(filters?: {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const { loading, error, execute } = useLoading();

  const fetchPosts = useCallback(async () => {
    const result = await execute(() => api.getBlogPosts(filters)) as PaginatedResponse<BlogPost> | null;
    if (result?.success && result.data) {
      setPosts(result.data);
      setPagination({
        page: result.pagination?.page || 1,
        limit: result.pagination?.limit || 10,
        total: result.pagination?.total || 0,
        totalPages: result.pagination?.total_pages || 0,
      });
    }
  }, [execute, filters]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, pagination, loading, error, refetch: fetchPosts };
}

// Hook for fetching featured blog posts
export function useFeaturedBlogPosts() {
  const [posts, setPosts] = useState<Partial<BlogPost>[]>([]);
  const { loading, error, execute } = useLoading();

  const fetchFeaturedPosts = useCallback(async () => {
    const result = await execute(() => api.getFeaturedBlogPosts()) as ApiResponse<Partial<BlogPost>[]> | null;
    if (result?.success && result.data) {
      setPosts(result.data);
    }
  }, [execute]);

  useEffect(() => {
    fetchFeaturedPosts();
  }, [fetchFeaturedPosts]);

  return { posts, loading, error, refetch: fetchFeaturedPosts };
}

// Hook for fetching a single blog post
export function useBlogPost(slug: string | null) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const { loading, error, execute } = useLoading();

  const fetchPost = useCallback(async () => {
    if (!slug) return;
    const result = await execute(() => api.getBlogPost(slug)) as ApiResponse<BlogPost> | null;
    if (result?.success && result.data) {
      setPost(result.data);
    }
  }, [slug, execute]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [fetchPost, slug]);

  return { post, loading, error, refetch: fetchPost };
}

// Hook for creating checkout session
export function useCheckout() {
  const { loading, error, execute } = useLoading();

  const createCheckoutSession = useCallback(async (data: {
    cart_session_id: string;
    customer_email?: string;
    shipping_address?: any;
    billing_address?: any;
  }) => {
    const result = await execute(() => api.createCheckoutSession(data)) as ApiResponse<{ id: string; url: string }> | null;
    if (result?.success && result.data) {
      return result.data;
    }
    return null;
  }, [execute]);

  const verifyCheckoutSession = useCallback(async (sessionId: string) => {
    const result = await execute(() => api.verifyCheckoutSession(sessionId)) as ApiResponse<{ order_id: number; order_number: string }> | null;
    if (result?.success && result.data) {
      return result.data;
    }
    return null;
  }, [execute]);

  return {
    loading,
    error,
    createCheckoutSession,
    verifyCheckoutSession,
  };
}