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
  // Get all published blog posts
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
      categories[]->{ title, slug }
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
      categories[]->{ title, slug },
      seo {
        metaTitle,
        metaDescription,
        keywords
      }
    }
  `,

  // Get all products
  getAllProducts: () => `
    *[_type == "productContent" && inStock == true] | order(featured desc, _createdAt desc) {
      _id,
      id,
      name,
      category,
      tableShape,
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

  // Get products by category
  getProductsByCategory: (category: string) => `
    *[_type == "productContent" && category == "${category}" && inStock == true] | order(featured desc, _createdAt desc) {
      _id,
      id,
      name,
      category,
      tableShape,
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

  // Get single product by ID
  getProductById: (productId: string) => `
    *[_type == "productContent" && id == "${productId}"][0] {
      _id,
      id,
      name,
      category,
      tableShape,
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
      category,
      tableShape,
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

  // Get all testimonials
  getTestimonials: () => `
    *[_type == "testimonial" && published == true] | order(featured desc, _createdAt desc) {
      _id,
      customerName,
      customerLocation,
      rating,
      testimonialText,
      productPurchased,
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
      "imageUrl": customerImage.asset->url
    }
  `,

  // Get all categories
  getAllCategories: () => `
    *[_type == "category"] | order(name asc) {
      _id,
      name,
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

  getBlogPost: async (slug: string) => {
    return fetchSanityData(sanityQueries.getBlogPostBySlug(slug))
  },

  // Product API
  getAllProducts: async () => {
    return fetchSanityData(sanityQueries.getAllProducts())
  },

  getProductsByCategory: async (category: string) => {
    return fetchSanityData(sanityQueries.getProductsByCategory(category))
  },

  getProductById: async (productId: string) => {
    return fetchSanityData(sanityQueries.getProductById(productId))
  },

  getFeaturedProducts: async () => {
    return fetchSanityData(sanityQueries.getFeaturedProducts())
  },

  // Category API
  getAllCategories: async () => {
    return fetchSanityData(sanityQueries.getAllCategories())
  },

  // Testimonial API
  getTestimonials: async () => {
    return fetchSanityData(sanityQueries.getTestimonials())
  },

  getFeaturedTestimonials: async () => {
    return fetchSanityData(sanityQueries.getFeaturedTestimonials())
  }
}

export default sanityClient