// Sorting and filtering utilities for Wood and Good products and content

export type SortDirection = 'asc' | 'desc'
export type ProductSortField = 'name' | 'price' | 'featured' | 'createdAt'
export type BlogSortField = 'title' | 'publishedAt' | 'featured'

export interface SortOptions {
  field: ProductSortField | BlogSortField
  direction: SortDirection
}

export interface ProductFilters {
  categoryType?: 'tables' | 'table-legs' | 'other'
  categorySlug?: string
  priceRange?: {
    min?: number
    max?: number
  }
  featured?: boolean
  inStock?: boolean
  search?: string
}

export interface BlogFilters {
  categorySlug?: string
  featured?: boolean
  tags?: string[]
  search?: string
  dateRange?: {
    start?: string
    end?: string
  }
}

// Product sorting functions
export const sortProducts = (products: any[], options: SortOptions) => {
  return [...products].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (options.field) {
      case 'name':
        aValue = a.name?.toLowerCase() || ''
        bValue = b.name?.toLowerCase() || ''
        break
      case 'price':
        aValue = a.price || 0
        bValue = b.price || 0
        break
      case 'featured':
        aValue = a.featured ? 1 : 0
        bValue = b.featured ? 1 : 0
        break
      case 'createdAt':
        aValue = new Date(a._createdAt || a.created_at || 0).getTime()
        bValue = new Date(b._createdAt || b.created_at || 0).getTime()
        break
      default:
        return 0
    }

    if (aValue < bValue) {
      return options.direction === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return options.direction === 'asc' ? 1 : -1
    }
    return 0
  })
}

// Blog post sorting functions
export const sortBlogPosts = (posts: any[], options: SortOptions) => {
  return [...posts].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (options.field) {
      case 'title':
        aValue = a.title?.toLowerCase() || ''
        bValue = b.title?.toLowerCase() || ''
        break
      case 'publishedAt':
        aValue = new Date(a.publishedAt || a.published_at || 0).getTime()
        bValue = new Date(b.publishedAt || b.published_at || 0).getTime()
        break
      case 'featured':
        aValue = a.featured ? 1 : 0
        bValue = b.featured ? 1 : 0
        break
      default:
        return 0
    }

    if (aValue < bValue) {
      return options.direction === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return options.direction === 'asc' ? 1 : -1
    }
    return 0
  })
}

// Product filtering functions
export const filterProducts = (products: any[], filters: ProductFilters) => {
  return products.filter(product => {
    // Category type filter
    if (filters.categoryType && product.productCategory?.categoryType !== filters.categoryType) {
      return false
    }

    // Specific category filter
    if (filters.categorySlug && product.productCategory?.slug?.current !== filters.categorySlug) {
      return false
    }

    // Price range filter
    if (filters.priceRange) {
      const price = product.price || 0
      if (filters.priceRange.min && price < filters.priceRange.min) {
        return false
      }
      if (filters.priceRange.max && price > filters.priceRange.max) {
        return false
      }
    }

    // Featured filter
    if (filters.featured !== undefined && product.featured !== filters.featured) {
      return false
    }

    // In stock filter
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const searchableText = [
        product.name,
        product.detailedDescription,
        product.productCategory?.title,
        product.productType?.title
      ].join(' ').toLowerCase()

      if (!searchableText.includes(searchTerm)) {
        return false
      }
    }

    return true
  })
}

// Blog post filtering functions
export const filterBlogPosts = (posts: any[], filters: BlogFilters) => {
  return posts.filter(post => {
    // Category filter
    if (filters.categorySlug && post.category?.slug?.current !== filters.categorySlug) {
      return false
    }

    // Featured filter
    if (filters.featured !== undefined && post.featured !== filters.featured) {
      return false
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const postTags = post.tags || []
      const hasTag = filters.tags.some(tag => postTags.includes(tag))
      if (!hasTag) {
        return false
      }
    }

    // Date range filter
    if (filters.dateRange) {
      const postDate = new Date(post.publishedAt || post.published_at)
      if (filters.dateRange.start && postDate < new Date(filters.dateRange.start)) {
        return false
      }
      if (filters.dateRange.end && postDate > new Date(filters.dateRange.end)) {
        return false
      }
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const searchableText = [
        post.title,
        post.excerpt,
        post.author,
        post.category?.title
      ].join(' ').toLowerCase()

      if (!searchableText.includes(searchTerm)) {
        return false
      }
    }

    return true
  })
}

// Predefined sort options for UI
export const PRODUCT_SORT_OPTIONS = [
  { label: 'Name (A-Z)', field: 'name' as ProductSortField, direction: 'asc' as SortDirection },
  { label: 'Name (Z-A)', field: 'name' as ProductSortField, direction: 'desc' as SortDirection },
  { label: 'Price (Low to High)', field: 'price' as ProductSortField, direction: 'asc' as SortDirection },
  { label: 'Price (High to Low)', field: 'price' as ProductSortField, direction: 'desc' as SortDirection },
  { label: 'Featured First', field: 'featured' as ProductSortField, direction: 'desc' as SortDirection },
  { label: 'Newest First', field: 'createdAt' as ProductSortField, direction: 'desc' as SortDirection },
  { label: 'Oldest First', field: 'createdAt' as ProductSortField, direction: 'asc' as SortDirection }
]

export const BLOG_SORT_OPTIONS = [
  { label: 'Latest First', field: 'publishedAt' as BlogSortField, direction: 'desc' as SortDirection },
  { label: 'Oldest First', field: 'publishedAt' as BlogSortField, direction: 'asc' as SortDirection },
  { label: 'Title (A-Z)', field: 'title' as BlogSortField, direction: 'asc' as SortDirection },
  { label: 'Title (Z-A)', field: 'title' as BlogSortField, direction: 'desc' as SortDirection },
  { label: 'Featured First', field: 'featured' as BlogSortField, direction: 'desc' as SortDirection }
]

// Category type mappings
export const PRODUCT_CATEGORY_TYPES = {
  TABLES: 'tables',
  TABLE_LEGS: 'table-legs',
  OTHER: 'other'
} as const

// Table leg shape mappings
export const TABLE_LEG_SHAPES = {
  X_SHAPE: 'x-shape',
  RECTANGULAR: 'rectangular', 
  CUSTOM: 'custom'
} as const

export const BLOG_CATEGORY_SLUGS = {
  WOOD_CARE: 'wood-care',
  DESIGN_TIPS: 'design-tips',
  CRAFTSMANSHIP: 'craftsmanship',
  SUSTAINABILITY: 'sustainability',
  HOME_DECOR: 'home-decor',
  FURNITURE_HISTORY: 'furniture-history'
} as const

// Utility functions for category management
export const getCategoryTypeLabel = (categoryType: string): string => {
  switch (categoryType) {
    case 'tables':
      return 'Tables'
    case 'table-legs':
      return 'Table Legs'
    case 'other':
      return 'Other Products'
    default:
      return categoryType
  }
}

export const getBlogCategoryLabel = (categorySlug: string): string => {
  switch (categorySlug) {
    case 'wood-care':
      return 'Wood Care'
    case 'design-tips':
      return 'Design Tips'
    case 'craftsmanship':
      return 'Craftsmanship'
    case 'sustainability':
      return 'Sustainability'
    case 'home-decor':
      return 'Home Decor'
    case 'furniture-history':
      return 'Furniture History'
    default:
      return categorySlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
}

export const getLegShapeLabel = (legShape: string): string => {
  switch (legShape) {
    case 'x-shape':
      return 'X Shape Legs'
    case 'rectangular':
      return 'Rectangular Shape Legs'
    case 'custom':
      return 'Custom Legs'
    default:
      return legShape.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
}

// Helper function to group products by category type
export const groupProductsByCategoryType = (products: any[]) => {
  return products.reduce((acc, product) => {
    const categoryType = product.productCategory?.categoryType || 'other'
    if (!acc[categoryType]) {
      acc[categoryType] = []
    }
    acc[categoryType].push(product)
    return acc
  }, {} as Record<string, any[]>)
}

// Helper function to group table legs by shape
export const groupTableLegsByShape = (products: any[]) => {
  const tableLegs = products.filter(p => p.productCategory?.categoryType === 'table-legs')
  return tableLegs.reduce((acc, product) => {
    // Use legShape from specifications or product category title
    const legShape = product.specifications?.legShape || 
                    (product.productCategory?.title?.toLowerCase().includes('x') ? 'x-shape' : 
                     product.productCategory?.title?.toLowerCase().includes('rectangular') ? 'rectangular' : 'custom')
    
    if (!acc[legShape]) {
      acc[legShape] = []
    }
    acc[legShape].push(product)
    return acc
  }, {} as Record<string, any[]>)
}

// Helper function to group blog posts by category
export const groupBlogPostsByCategory = (posts: any[]) => {
  return posts.reduce((acc, post) => {
    const categorySlug = post.category?.slug?.current || 'uncategorized'
    if (!acc[categorySlug]) {
      acc[categorySlug] = []
    }
    acc[categorySlug].push(post)
    return acc
  }, {} as Record<string, any[]>)
}