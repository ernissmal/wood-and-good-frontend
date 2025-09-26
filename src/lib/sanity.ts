import { createClient } from '@sanity/client'

// Frontend Sanity client with read-only access
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Enable CDN for better performance
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

  // Get product content by slug  
  getProductContentBySlug: (slug: string) => `
    *[_type == "productContent" && slug.current == "${slug}"][0] {
      _id,
      title,
      slug,
      description,
      specifications,
      careInstructions,
      "images": images[].asset->url,
      seo {
        metaTitle,
        metaDescription,
        keywords
      }
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
  getBlogPosts: async () => {
    return fetchSanityData(sanityQueries.getAllBlogPosts())
  },

  getBlogPost: async (slug: string) => {
    return fetchSanityData(sanityQueries.getBlogPostBySlug(slug))
  },

  getProductContent: async (slug: string) => {
    return fetchSanityData(sanityQueries.getProductContentBySlug(slug))
  },

  getTestimonials: async () => {
    return fetchSanityData(sanityQueries.getTestimonials())
  },

  getFeaturedTestimonials: async () => {
    return fetchSanityData(sanityQueries.getFeaturedTestimonials())
  }
}

export default sanityClient