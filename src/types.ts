// Frontend Types for The Wood and Good E-commerce

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

// Sanity Product type
export interface SanityProduct {
  _id: string
  id: string
  name: string
  productCategory?: SanityProductCategory
  productType?: {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
  tableShape?: string
  price: number
  detailedDescription: string
  careInstructions?: string
  specifications?: {
    weight?: string
    color?: string
    finish?: string
    legShape?: string
    dimensions?: string
  }
  additionalImages?: Array<{
    asset: {
      url: string
    }
    alt?: string
  }>
  relatedProducts?: string[]
  featured: boolean
  inStock: boolean
}

// Sanity Testimonial type
export interface SanityTestimonial {
  _id: string
  customerName: string
  customerLocation?: string
  rating: number
  testimonialText: string
  productPurchased?: string
  testimonialType: 'B2C' | 'B2B'
  featured: boolean
  published: boolean
  customerImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
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

// Sanity-specific types for the new schema
export interface SanityProductCategory {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  categoryType: 'tables' | 'table-legs' | 'other'
  parentCategory?: string
  displayOrder?: number
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

export interface SanityBlogCategory {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  categoryType: 'content' // All blog categories are content type
  displayOrder?: number
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

export interface SanityTestimonialType {
  B2C: 'B2C'
  B2B: 'B2B'
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

// Sanity Blog Post type
export interface SanityBlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  content: any[] // Portable text
  publishedAt: string
  author: string
  mainImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  category?: SanityBlogCategory
  featured: boolean
  tags?: string[]
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