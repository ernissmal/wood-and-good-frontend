// Frontend Types for Wood & Good E-commerce

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

export interface Product {
  id: number
  name: string
  description: string
  short_description: string
  price: number
  sku: string
  category_id: number
  featured: boolean
  active: boolean
  stock: number
  stock_quantity: number
  image_url: string
  gallery_images: string
  seo_slug: string
  seo_title: string
  seo_description: string
  wood_type: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  description: string
  seo_slug: string
  parent_id: number | null
  display_order: number
  active: boolean
  image_url?: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image?: string
  author: string
  category?: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: number
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
  product: Product
}

export interface Cart {
  id: string
  session_id: string
  items: CartItem[]
  total_items: number
  total_amount: number
  created_at: string
  updated_at: string
}

export interface SearchParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  price_min?: number
  price_max?: number
  featured?: boolean
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest'
}