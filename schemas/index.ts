// Schema types for Wood and Good CMS

import productCategory from './productCategory'
import productType from './productType'
import blogCategory from './blogCategory'
import productContent from './productContent'
import blogPost from './blogPost'
import testimonial from './testimonial'

// Table configuration schemas
import tableShape from './tableShape'
import tableMaterial from './tableMaterial'
import tableSize from './tableSize'
import tableQuality from './tableQuality'
import tableConfiguration from './tableConfiguration'
import customerQuote from './customerQuote'

export const schemaTypes = [
  // Categories (create these first as they're referenced by other types)
  productCategory,
  productType,
  blogCategory,
  
  // Table configuration components
  tableShape,
  tableMaterial,
  tableSize,
  tableQuality,
  
  // Content types that reference categories
  productContent,
  blogPost,
  testimonial,
  
  // Advanced table configuration and quotes
  tableConfiguration,
  customerQuote,
]