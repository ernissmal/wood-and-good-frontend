// API client for Wood & Good E-commerce

import { Product, Category, BlogPost, Cart, ApiResponse, PaginatedResponse, SearchParams } from '../types';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? 'http://localhost:3333' 
  : 'https://cms.woodandgood.com';

class ApiClient {
  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Products
  async getProducts(filters?: SearchParams): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetch<PaginatedResponse<Product>>(`/api/products${query}`);
  }

  async getProduct(slug: string): Promise<ApiResponse<Product>> {
    return this.fetch<ApiResponse<Product>>(`/api/products/${slug}`);
  }

  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return this.fetch<ApiResponse<Product[]>>('/api/products?featured=true&limit=8');
  }

  // Categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.fetch<ApiResponse<Category[]>>('/api/categories');
  }

  async getCategory(slug: string): Promise<ApiResponse<Category>> {
    return this.fetch<ApiResponse<Category>>(`/api/categories/${slug}`);
  }

  // Blog Posts
  async getBlogPosts(filters?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
  }): Promise<PaginatedResponse<BlogPost>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetch<PaginatedResponse<BlogPost>>(`/api/blog${query}`);
  }

  async getBlogPost(slug: string): Promise<ApiResponse<BlogPost>> {
    return this.fetch<ApiResponse<BlogPost>>(`/api/blog/${slug}`);
  }

  async getFeaturedBlogPosts(): Promise<ApiResponse<Partial<BlogPost>[]>> {
    return this.fetch<ApiResponse<Partial<BlogPost>[]>>('/api/blog?featured=true&limit=3');
  }

  // Cart
  async getCart(sessionId: string): Promise<ApiResponse<Cart>> {
    return this.fetch<ApiResponse<Cart>>(`/api/cart/${sessionId}`);
  }

  async addToCart(sessionId: string, productId: number, quantity: number = 1, variantId?: number): Promise<ApiResponse<Cart>> {
    return this.fetch<ApiResponse<Cart>>(`/api/cart/${sessionId}/add`, {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity, variant_id: variantId }),
    });
  }

  async updateCartItem(sessionId: string, productId: number, quantity: number): Promise<ApiResponse<Cart>> {
    return this.fetch<ApiResponse<Cart>>(`/api/cart/${sessionId}/update`, {
      method: 'PUT',
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  }

  async removeFromCart(sessionId: string, productId: number): Promise<ApiResponse<Cart>> {
    return this.fetch<ApiResponse<Cart>>(`/api/cart/${sessionId}/remove`, {
      method: 'DELETE',
      body: JSON.stringify({ product_id: productId }),
    });
  }

  async clearCart(sessionId: string): Promise<ApiResponse<Cart>> {
    return this.fetch<ApiResponse<Cart>>(`/api/cart/${sessionId}/clear`, {
      method: 'DELETE',
    });
  }

  // Checkout
  async createCheckoutSession(data: {
    cart_session_id: string;
    customer_email?: string;
    shipping_address?: any;
    billing_address?: any;
  }): Promise<ApiResponse<{ id: string; url: string }>> {
    return this.fetch<ApiResponse<{ id: string; url: string }>>('/api/checkout/session', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyCheckoutSession(sessionId: string): Promise<ApiResponse<{ order_id: number; order_number: string }>> {
    return this.fetch<ApiResponse<{ order_id: number; order_number: string }>>(`/api/checkout/verify/${sessionId}`);
  }
}

export const api = new ApiClient();