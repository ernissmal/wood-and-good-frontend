# Implementation Guide: Enhanced Sorting System for Wood and Good

This guide provides step-by-step instructions for implementing the new categorization and sorting system across your website.

## Summary of Changes

### 1. Updated Schema Structure
- **Product Categories**: Now hierarchical with `categoryType` (tables, table-legs, other)
- **Blog Categories**: Structured content categories with proper taxonomy
- **Testimonials**: Internal B2C/B2B categorization (not visible to users)

### 2. Enhanced API Queries
- New Sanity queries supporting reference-based categorization
- Backward compatibility maintained during transition
- Type-safe API methods with proper error handling

### 3. Advanced Sorting & Filtering
- Multiple sort options (name, price, featured, date)
- Complex filtering (category, price range, search, featured status)
- Real-time filtering with immediate UI updates

### 4. Improved User Experience
- Category type filtering (Tables, Table Legs, Other)
- Advanced filter panel with multiple criteria
- Grid/List view toggle
- Search functionality across products and content

## Implementation Steps

### Step 1: Update Your Sanity Studio Schema

1. **Create new schema files in your Sanity studio:**

```javascript
// schemas/productCategory.js
export default {
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
      options: { source: 'title', maxLength: 96 },
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
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number'
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }]
    }
  ]
}
```

```javascript
// schemas/blogCategory.js
export default {
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
      options: { source: 'title', maxLength: 96 },
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
      readOnly: true
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number'
    }
  ]
}
```

2. **Update existing schemas:**

```javascript
// Update productContent.js
// Replace the old 'category' field with:
{
  name: 'productCategory',
  title: 'Product Category',
  type: 'reference',
  to: [{ type: 'productCategory' }],
  validation: Rule => Rule.required()
}

// Update blogPost.js
// Replace the old 'categories' array with:
{
  name: 'category',
  title: 'Category',
  type: 'reference',
  to: [{ type: 'blogCategory' }],
  validation: Rule => Rule.required()
},
{
  name: 'featured',
  title: 'Featured Post',
  type: 'boolean',
  initialValue: false
}

// Update testimonial.js
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
}
```

### Step 2: Create Initial Categories

1. **Product Categories:**
   - Tables → Dining Tables, Coffee Tables, Side Tables, etc.
   - Table Legs → Traditional, Modern, Farmhouse, Industrial
   - Other → Chairs, Benches, Storage, Accessories

2. **Blog Categories:**
   - Wood Care
   - Design Tips
   - Craftsmanship
   - Sustainability
   - Home Decor
   - Furniture History

### Step 3: Update Frontend Code

The following files have been created/updated:

1. **`src/lib/sanity.ts`** - Updated with new queries supporting references
2. **`src/types.ts`** - Added Sanity-specific types
3. **`src/lib/sorting.ts`** - New utility functions for sorting and filtering
4. **`src/hooks/enhanced-sanity.ts`** - Enhanced hooks with sorting capabilities
5. **`src/hooks/sanity.ts`** - Updated existing hooks for backward compatibility

### Step 4: Update Your Pages

1. **Products Page** - Use the enhanced example:
   - Copy `src/app/products/enhanced-page.tsx` to `src/app/products/page.tsx`
   - Customize styling to match your design system

2. **Categories Page** - Update to use new category system:
   ```tsx
   import { useSanityProductCategories } from '../../hooks/sanity';
   ```

3. **Blog Page** - Update to use new blog categories:
   ```tsx
   import { useBlogManager } from '../../hooks/enhanced-sanity';
   ```

## Usage Examples

### Basic Product Filtering
```tsx
import { useProductManager } from '../hooks/enhanced-sanity';

function ProductsPage() {
  const { products, setFilters, setSortOptions } = useProductManager();
  
  // Filter by category type
  const showTables = () => setFilters({ categoryType: 'tables' });
  
  // Sort by price
  const sortByPrice = () => setSortOptions({ field: 'price', direction: 'asc' });
  
  return (
    <div>
      <button onClick={showTables}>Show Tables</button>
      <button onClick={sortByPrice}>Sort by Price</button>
      {products.map(product => <ProductCard key={product._id} product={product} />)}
    </div>
  );
}
```

### Advanced Blog Filtering
```tsx
import { useBlogManager } from '../hooks/enhanced-sanity';

function BlogPage() {
  const { posts, setFilters, filters } = useBlogManager();
  
  const filterByCategory = (categorySlug: string) => {
    setFilters({ categorySlug });
  };
  
  return (
    <div>
      <select onChange={(e) => filterByCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="wood-care">Wood Care</option>
        <option value="design-tips">Design Tips</option>
      </select>
      {posts.map(post => <BlogCard key={post._id} post={post} />)}
    </div>
  );
}
```

### Category-Specific Pages
```tsx
import { useCategoryProducts } from '../hooks/enhanced-sanity';

function TablesPage() {
  const { products, setSortOptions } = useCategoryProducts('tables');
  
  // Products are automatically filtered to tables category
  return (
    <div>
      <h1>Tables</h1>
      {products.map(product => <ProductCard key={product._id} product={product} />)}
    </div>
  );
}
```

## Migration Strategy

### Phase 1: Setup (Week 1)
1. Update Sanity schema in development environment
2. Create initial categories
3. Test new queries with existing data

### Phase 2: Data Migration (Week 2)
1. Update existing products to use new category references
2. Update existing blog posts to use new category system
3. Verify data integrity

### Phase 3: Frontend Update (Week 3)
1. Deploy updated frontend code
2. Test all filtering and sorting functionality
3. Update any hardcoded category references

### Phase 4: Optimization (Week 4)
1. Monitor performance
2. Add any missing sort/filter options
3. Gather user feedback and iterate

## Benefits

### For Users:
- **Better Navigation**: Clear hierarchy makes finding products easier
- **Advanced Filtering**: Multiple filter criteria for precise results
- **Flexible Sorting**: Sort by relevance, price, date, or featured status
- **Search Integration**: Find products across categories

### For Admins:
- **Organized Content**: Clear categorization system
- **Easy Management**: Reference-based categories prevent data inconsistency
- **Flexible Taxonomy**: Easy to add new categories without code changes
- **Analytics Ready**: Better data structure for reporting

### For Developers:
- **Type Safety**: Full TypeScript support
- **Maintainable Code**: Centralized sorting/filtering logic
- **Scalable Architecture**: Easy to extend with new features
- **Performance Optimized**: Efficient queries and client-side caching

## Next Steps

1. **Review the schema documentation** in `CMS_SCHEMA_STRUCTURE.md`
2. **Test the new API methods** using the updated `sanity.ts` file
3. **Implement the enhanced product page** using the example in `enhanced-page.tsx`
4. **Update your existing pages** to use the new hooks and utilities
5. **Create categories in your CMS** following the structure outlined above

## Support

If you encounter any issues during implementation:
1. Check the console for specific error messages
2. Verify your Sanity schema matches the documentation
3. Ensure all required fields are populated in your CMS
4. Test API queries directly in Sanity's Vision tool

The new system is designed to be backward compatible, so your existing site should continue working while you migrate to the enhanced features.