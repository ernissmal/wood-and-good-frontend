// Schema types for Wood and Good CMS

import productCategory from './productCategory'
import productType from './productType'
import blogCategory from './blogCategory'
import productContent from './productContent'
import blogPost from './blogPost'
import testimonial from './testimonial'

export const schemaTypes = [
  // Categories (create these first as they're referenced by other types)
  productCategory,
  productType,
  blogCategory,
  
  // Content types that reference categories
  productContent,
  blogPost,
  testimonial,
]