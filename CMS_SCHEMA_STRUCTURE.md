# CMS Schema Structure for Wood and Good Website

This document outlines the required schema structure in Sanity CMS to support the improved sorting and categorization system.

## Overview

The new schema supports a hierarchical categorization system that allows for:

1. **Product Management** with three main categories:
   - Tables
   - Table legs  
   - Other products

2. **Content Management** with organized blog categories:
   - Wood care
   - Design tips
   - Craftsmanship
   - Sustainability
   - Home decor
   - Furniture history

3. **Testimonial Management** with internal B2C/B2B categorization (not visible to users)

## Schema Documents

### 1. Product Category (`productCategory`)

```javascript
{
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'categoryType',
      title: 'Category Type',
      type: 'string',
      options: {
        list: [
          { title: 'Tables', value: 'tables' },
          { title: 'Table Legs', value: 'table-legs' },
          { title: 'Other Products', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'string',
      description: 'Optional parent category for subcategorization'
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category should appear'
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    }
  ]
}
```

### 2. Blog Category (`blogCategory`)

```javascript
{
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'categoryType',
      title: 'Category Type',
      type: 'string',
      initialValue: 'content',
      readOnly: true,
      description: 'All blog categories are content type'
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category should appear'
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    }
  ]
}
```

### 3. Updated Product Content (`productContent`)

```javascript
{
  name: 'productContent',
  title: 'Product',
  type: 'document',
  fields: [
    // ... existing fields ...
    
    // Replace the old 'category' string field with:
    {
      name: 'productCategory',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'reference',
      to: [{ type: 'productType' }],
      description: 'Optional subcategory for more specific classification'
    },
    
    // ... rest of existing fields ...
  ]
}
```

### 4. Updated Blog Post (`blogPost`)

```javascript
{
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // ... existing fields ...
    
    // Replace the old 'categories' array with:
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false
    },
    
    // ... rest of existing fields ...
  ]
}
```

### 5. Updated Testimonial (`testimonial`)

```javascript
{
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    // ... existing fields ...
    
    // Add testimonial type field:
    {
      name: 'testimonialType',
      title: 'Testimonial Type',
      type: 'string',
      options: {
        list: [
          { title: 'B2C (Business to Consumer)', value: 'B2C' },
          { title: 'B2B (Business to Business)', value: 'B2B' }
        ]
      },
      initialValue: 'B2C',
      validation: Rule => Rule.required(),
      description: 'Internal categorization - not visible to website users'
    },
    
    // ... rest of existing fields ...
  ]
}
```

### 6. Product Type (`productType`) - Optional Subcategorization

```javascript
{
  name: 'productType',
  title: 'Product Type',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Type Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
```

## Initial Data Setup

### Product Categories to Create:

1. **Tables** (`categoryType: 'tables'`)
   - Dining Tables
   - Coffee Tables
   - Side Tables
   - Console Tables
   - Desk Tables

2. **Table Legs** (`categoryType: 'table-legs'`)
   - Traditional Turned Legs
   - Modern Hairpin Legs
   - Farmhouse Style Legs
   - Industrial Legs
   - Custom Legs

3. **Other Products** (`categoryType: 'other'`)
   - Chairs
   - Benches
   - Storage Solutions
   - Accessories

### Blog Categories to Create:

1. **Wood Care** (`categoryType: 'content'`)
2. **Design Tips** (`categoryType: 'content'`)
3. **Craftsmanship** (`categoryType: 'content'`)
4. **Sustainability** (`categoryType: 'content'`)
5. **Home Decor** (`categoryType: 'content'`)
6. **Furniture History** (`categoryType: 'content'`)

## API Usage Examples

### Frontend Usage:

```typescript
// Get all products in the "tables" category type
const tablesProducts = await sanityApi.getProductsByCategoryType('tables');

// Get all products in a specific category (e.g., "dining-tables")
const diningTables = await sanityApi.getProductsByCategory('dining-tables');

// Get blog posts by category
const woodCarePosts = await sanityApi.getBlogPostsByCategory('wood-care');

// Get testimonials by type (internal use only)
const b2cTestimonials = await sanityApi.getTestimonialsByType('B2C');
```

### Benefits of This Structure:

1. **Hierarchical Organization**: Clear parent-child relationships
2. **Flexible Sorting**: Multiple sorting mechanisms (by type, by specific category, by display order)
3. **Scalable**: Easy to add new categories without breaking existing functionality
4. **SEO Friendly**: Category slugs for clean URLs
5. **Admin Friendly**: Clear distinction between different content types
6. **Future Proof**: Schema supports additional categorization as business grows

## Migration Notes

1. **Backward Compatibility**: Old category fields are preserved during transition
2. **Data Migration**: Existing products and blog posts need to be updated to use the new reference fields
3. **URL Preservation**: Existing category URLs should be maintained through proper slug mapping
4. **Testing Required**: All category-related functionality should be tested after migration

## Frontend Implementation

The updated frontend code now supports:
- Filtering products by main category types (tables, table-legs, other)
- Filtering products by specific categories within each type
- Filtering blog posts by content categories
- Internal testimonial categorization (B2C/B2B) without user visibility
- Proper TypeScript types for all new schema structures