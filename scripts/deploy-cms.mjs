#!/usr/bin/env node

/**
 * Initial CMS Setup Script
 * This script creates the initial categories and structure for the Wood and Good CMS
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Create client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hrcndigj',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-09-26',
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to set this
})

// Initial data
const initialData = {
  productCategories: [
    // Tables
    {
      _type: 'productCategory',
      title: 'Dining Tables',
      slug: { current: 'dining-tables' },
      description: 'Handcrafted oak dining tables for memorable meals and gatherings',
      categoryType: 'tables',
      displayOrder: 1,
    },
    {
      _type: 'productCategory', 
      title: 'Coffee Tables',
      slug: { current: 'coffee-tables' },
      description: 'Elegant oak coffee tables to anchor your living space',
      categoryType: 'tables',
      displayOrder: 2,
    },
    {
      _type: 'productCategory',
      title: 'Side Tables',
      slug: { current: 'side-tables' },
      description: 'Compact oak side tables for accent and functionality',
      categoryType: 'tables',
      displayOrder: 3,
    },
    
    // Table Legs - Updated to reflect actual offerings
    {
      _type: 'productCategory',
      title: 'X Shape Legs',
      slug: { current: 'x-shape-legs' },
      description: 'Modern and striking X-shaped legs for contemporary tables',
      categoryType: 'table-legs',
      displayOrder: 1,
    },
    {
      _type: 'productCategory',
      title: 'Rectangular Shape Legs',
      slug: { current: 'rectangular-shape-legs' },
      description: 'Classic and sturdy rectangular legs for traditional elegance',
      categoryType: 'table-legs',
      displayOrder: 2,
    },
    {
      _type: 'productCategory',
      title: 'Custom Legs',
      slug: { current: 'custom-legs' },
      description: 'Bespoke legs designed to your exact specifications',
      categoryType: 'table-legs',
      displayOrder: 3,
    },
    
    // Other Products
    {
      _type: 'productCategory',
      title: 'Benches',
      slug: { current: 'benches' },
      description: 'Oak benches for dining rooms and entryways',
      categoryType: 'other',
      displayOrder: 1,
    },
    {
      _type: 'productCategory',
      title: 'Storage Solutions',
      slug: { current: 'storage-solutions' },
      description: 'Oak storage furniture for organized living',
      categoryType: 'other',
      displayOrder: 2,
    },
  ],
  
  blogCategories: [
    {
      _type: 'blogCategory',
      title: 'Wood Care',
      slug: { current: 'wood-care' },
      description: 'Tips and guides for maintaining your oak furniture',
      categoryType: 'content',
      displayOrder: 1,
    },
    {
      _type: 'blogCategory',
      title: 'Design Tips',
      slug: { current: 'design-tips' },
      description: 'Interior design advice and styling ideas',
      categoryType: 'content',
      displayOrder: 2,
    },
    {
      _type: 'blogCategory',
      title: 'Craftsmanship',
      slug: { current: 'craftsmanship' },
      description: 'Behind the scenes of oak furniture creation',
      categoryType: 'content',
      displayOrder: 3,
    },
    {
      _type: 'blogCategory',
      title: 'Sustainability',
      slug: { current: 'sustainability' },
      description: 'Our commitment to sustainable woodworking',
      categoryType: 'content',
      displayOrder: 4,
    },
    {
      _type: 'blogCategory',
      title: 'Home Decor',
      slug: { current: 'home-decor' },
      description: 'Home decoration ideas and inspiration',
      categoryType: 'content',
      displayOrder: 5,
    },
    {
      _type: 'blogCategory',
      title: 'Furniture History',
      slug: { current: 'furniture-history' },
      description: 'The history and heritage of furniture making',
      categoryType: 'content',
      displayOrder: 6,
    },
  ],
}

async function deployInitialData() {
  try {
    console.log('🚀 Starting CMS deployment...')
    
    // Check if we have write access
    if (!process.env.SANITY_WRITE_TOKEN) {
      console.error('❌ SANITY_WRITE_TOKEN environment variable is required for deployment')
      console.log('Please set up a write token from your Sanity project dashboard:')
      console.log('1. Go to https://www.sanity.io/manage')
      console.log('2. Select your project')
      console.log('3. Go to API -> Tokens')
      console.log('4. Create a new token with Editor permissions')
      console.log('5. Set SANITY_WRITE_TOKEN=your-token in your .env.local file')
      process.exit(1)
    }
    
    // Deploy product categories
    console.log('📦 Creating product categories...')
    for (const category of initialData.productCategories) {
      try {
        const result = await client.create(category)
        console.log(`✅ Created product category: ${category.title}`)
      } catch (error) {
        if (error.statusCode === 409) {
          console.log(`⚠️  Product category already exists: ${category.title}`)
        } else {
          console.error(`❌ Failed to create product category ${category.title}:`, error.message)
        }
      }
    }
    
    // Deploy blog categories
    console.log('📝 Creating blog categories...')
    for (const category of initialData.blogCategories) {       
      try {
        const result = await client.create(category)
        console.log(`✅ Created blog category: ${category.title}`)
      } catch (error) {
        if (error.statusCode === 409) {
          console.log(`⚠️  Blog category already exists: ${category.title}`)
        } else {
          console.error(`❌ Failed to create blog category ${category.title}:`, error.message)
        }
      }
    }
    
    console.log('🎉 CMS deployment completed successfully!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Run "npm run sanity:dev" to open the Sanity Studio')
    console.log('2. Start creating products and blog posts using the new categories')
    console.log('3. Update existing content to use the new category references')
    
  } catch (error) {
    console.error('❌ Deployment failed:', error)
    process.exit(1)
  }
}

// Run the deployment
deployInitialData()