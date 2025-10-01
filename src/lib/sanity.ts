import { createClient } from '@sanity/client'

// Frontend Sanity client with read-only access
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Disable CDN for local development
  apiVersion: '2024-09-26', // Current API version
  
  // Frontend should only have read access
  token: undefined, // No write token for frontend
  
  // Security configuration
  perspective: 'published', // Only published content
  stega: false, // Disable live editing for security
})

// Read-only API methods for frontend
export const sanityQueries = {
  // Get all published blog posts with enhanced categorization
  getAllBlogPosts: () => `
    *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      "category": category->{
        _id,
        title,
        slug,
        categoryType
      },
      featured,
      tags[]
    }
  `,

  // Get blog posts by category
  getBlogPostsByCategory: (categorySlug: string) => `
    *[_type == "blogPost" && !(_id in path("drafts.**")) && category->slug.current == "${categorySlug}"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      "category": category->{
        _id,
        title,
        slug,
        categoryType
      },
      featured,
      tags[]
    }
  `,

  // Get blog posts by category type (for internal filtering)
  getBlogPostsByCategoryType: (categoryType: string) => `
    *[_type == "blogPost" && !(_id in path("drafts.**")) && category->categoryType == "${categoryType}"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      "category": category->{
        _id,
        title,
        slug,
        categoryType
      },
      featured,
      tags[]
    }
  `,

  // Get single blog post by slug
  getBlogPostBySlug: (slug: string) => `
    *[_type == "blogPost" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      content,
      excerpt,
      publishedAt,
      author,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      "category": category->{
        _id,
        title,
        slug,
        categoryType
      },
      featured,
      tags[],
      seo {
        metaTitle,
        metaDescription,
        keywords
      }
    }
  `,

  // Get all products with enhanced categorization
  getAllProducts: () => `
    *[_type == "productContent" && inStock == true] | order(featured desc, _createdAt desc) {
      _id,
      id,
      name,
      "productCategory": productCategory->{
        _id,
        title,
        slug,
        categoryType,
        parentCategory
      },
      "productType": productType->{
        _id,
        title,
        slug
      },
      tableShape,
      price,
      detailedDescription,
      careInstructions,
      specifications {
        weight,
        color,
        finish,
        legShape,
        dimensions
      },
      "images": additionalImages[].asset->url,
      "imageAlts": additionalImages[].alt,
      relatedProducts,
      featured,
      inStock
    }
  `,

  // Get products by category (using reference)
  getProductsByCategory: (categorySlug: string) => `
    *[_type == "productContent" && productCategory->slug.current == "${categorySlug}" && inStock == true] | order(featured desc, _createdAt desc) {
      _id,
      id,
      name,
      "productCategory": productCategory->{
        _id,
        title,
        slug,
        categoryType,
        parentCategory
      },
      "productType": productType->{
        _id,
        title,
        slug
      },
      tableShape,
      price,
      detailedDescription,
      careInstructions,
      specifications {
        weight,
        color,
        finish,
        legShape,
        dimensions
      },
      "images": additionalImages[].asset->url,
      "imageAlts": additionalImages[].alt,
      relatedProducts,
      featured,
      inStock
    }
  `,

  // Get products by category type (for the main categories: tables, table-legs, other)
  getProductsByCategoryType: (categoryType: string) => `
    *[_type == "productContent" && productCategory->categoryType == "${categoryType}" && inStock == true] | order(featured desc, _createdAt desc) {
      _id,
      id,
      name,
      "productCategory": productCategory->{
        _id,
        title,
        slug,
        categoryType,
        parentCategory
      },
      "productType": productType->{
        _id,
        title,
        slug
      },
      tableShape,
      price,
      detailedDescription,
      careInstructions,
      specifications {
        weight,
        color,
        finish,
        legShape,
        dimensions
      },
      "images": additionalImages[].asset->url,
      "imageAlts": additionalImages[].alt,
      relatedProducts,
      featured,
      inStock
    }
  `,

  // Get single product by ID (supports both custom id and _id)
  getProductById: (productId: string) => `
    *[_type == "productContent" && (id == "${productId}" || _id == "${productId}")][0] {
      _id,
      id,
      name,
      "productCategory": productCategory->{
        _id,
        title,
        slug,
        categoryType,
        parentCategory
      },
      "productType": productType->{
        _id,
        title,
        slug
      },
      tableShape,
      price,
      detailedDescription,
      careInstructions,
      specifications {
        weight,
        color,
        finish,
        legShape,
        dimensions
      },
      "images": additionalImages[].asset->url,
      "imageAlts": additionalImages[].alt,
      relatedProducts,
      featured,
      inStock
    }
  `,

  // Get featured products for homepage
  getFeaturedProducts: () => `
    *[_type == "productContent" && featured == true && inStock == true] | order(_createdAt desc) [0...6] {
      _id,
      id,
      name,
      "productCategory": productCategory->{
        _id,
        title,
        slug,
        categoryType,
        parentCategory
      },
      "productType": productType->{
        _id,
        title,
        slug
      },
      tableShape,
      price,
      detailedDescription[0..1],
      specifications {
        weight,
        color,
        finish,
        dimensions
      },
      "images": additionalImages[0..2].asset->url,
      "imageAlts": additionalImages[0..2].alt,
      featured,
      inStock
    }
  `,

  // Get all testimonials with enhanced categorization
  getTestimonials: () => `
    *[_type == "testimonial" && published == true] | order(featured desc, _createdAt desc) {
      _id,
      customerName,
      customerLocation,
      rating,
      testimonialText,
      productPurchased,
      testimonialType,
      featured,
      "imageUrl": customerImage.asset->url
    }
  `,

  // Get testimonials by type (B2C or B2B - internal filtering, not exposed to users)
  getTestimonialsByType: (testimonialType: string) => `
    *[_type == "testimonial" && published == true && testimonialType == "${testimonialType}"] | order(featured desc, _createdAt desc) {
      _id,
      customerName,
      customerLocation,
      rating,
      testimonialText,
      productPurchased,
      testimonialType,
      featured,
      "imageUrl": customerImage.asset->url
    }
  `,

  // Get featured testimonials for homepage
  getFeaturedTestimonials: () => `
    *[_type == "testimonial" && published == true && featured == true] | order(_createdAt desc) [0...3] {
      _id,
      customerName,
      customerLocation,
      rating,
      testimonialText,
      productPurchased,
      testimonialType,
      "imageUrl": customerImage.asset->url
    }
  `,

  // Get all product categories
  getAllProductCategories: () => `
    *[_type == "productCategory"] | order(categoryType asc, title asc) {
      _id,
      title,
      slug,
      description,
      categoryType,
      parentCategory,
      displayOrder,
      "imageUrl": image.asset->url
    }
  `,

  // Get product categories by type (tables, table-legs, other)
  getProductCategoriesByType: (categoryType: string) => `
    *[_type == "productCategory" && categoryType == "${categoryType}"] | order(displayOrder asc, title asc) {
      _id,
      title,
      slug,
      description,
      categoryType,
      parentCategory,
      displayOrder,
      "imageUrl": image.asset->url
    }
  `,

  // Get all blog categories
  getAllBlogCategories: () => `
    *[_type == "blogCategory"] | order(displayOrder asc, title asc) {
      _id,
      title,
      slug,
      description,
      categoryType,
      displayOrder,
      "imageUrl": image.asset->url
    }
  `,

  // Legacy support - Get all categories (for backward compatibility)
  getAllCategories: () => `
    *[_type == "productCategory"] | order(categoryType asc, title asc) {
      _id,
      "name": title,
      slug,
      description,
      "imageUrl": image.asset->url
    }
  `
}

// Utility function to fetch data with error handling
export async function fetchSanityData<T>(query: string): Promise<T | null> {
  try {
    const data = await sanityClient.fetch<T>(query)
    return data
  } catch (error) {
    console.error('Error fetching Sanity data:', error)
    return null
  }
}

// Type-safe fetch functions
export const sanityApi = {
  // Blog API
  getBlogPosts: async () => {
    return fetchSanityData(sanityQueries.getAllBlogPosts())
  },

  getBlogPostsByCategory: async (categorySlug: string) => {
    return fetchSanityData(sanityQueries.getBlogPostsByCategory(categorySlug))
  },

  getBlogPostsByCategoryType: async (categoryType: string) => {
    return fetchSanityData(sanityQueries.getBlogPostsByCategoryType(categoryType))
  },

  getBlogPost: async (slug: string) => {
    return fetchSanityData(sanityQueries.getBlogPostBySlug(slug))
  },

  // Product API
  getAllProducts: async () => {
    return fetchSanityData(sanityQueries.getAllProducts())
  },

  getProductsByCategory: async (categorySlug: string) => {
    return fetchSanityData(sanityQueries.getProductsByCategory(categorySlug))
  },

  getProductsByCategoryType: async (categoryType: string) => {
    return fetchSanityData(sanityQueries.getProductsByCategoryType(categoryType))
  },

  getProductById: async (productId: string) => {
    return fetchSanityData(sanityQueries.getProductById(productId))
  },

  getFeaturedProducts: async () => {
    return fetchSanityData(sanityQueries.getFeaturedProducts())
  },

  // Category API
  getAllProductCategories: async () => {
    return fetchSanityData(sanityQueries.getAllProductCategories())
  },

  getProductCategoriesByType: async (categoryType: string) => {
    return fetchSanityData(sanityQueries.getProductCategoriesByType(categoryType))
  },

  getAllBlogCategories: async () => {
    return fetchSanityData(sanityQueries.getAllBlogCategories())
  },

  // Legacy support
  getAllCategories: async () => {
    return fetchSanityData(sanityQueries.getAllCategories())
  },

  // Testimonial API
  getTestimonials: async () => {
    return fetchSanityData(sanityQueries.getTestimonials())
  },

  getTestimonialsByType: async (testimonialType: string) => {
    return fetchSanityData(sanityQueries.getTestimonialsByType(testimonialType))
  },

  getFeaturedTestimonials: async () => {
    return fetchSanityData(sanityQueries.getFeaturedTestimonials())
  }
}

export default sanityClient