import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productContent',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Product ID',
      type: 'string',
      description: 'Custom product identifier for internal use',
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productCategory',
      title: 'Product Category',
      type: 'reference',
      to: [{type: 'productCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'reference',
      to: [{type: 'productType'}],
      description: 'Optional subcategory for more specific classification',
    }),
    defineField({
      name: 'tableShape',
      title: 'Table Shape',
      type: 'string',
      options: {
        list: [
          {title: 'Round', value: 'round'},
          {title: 'Rectangular', value: 'rectangular'},
          {title: 'Square', value: 'square'},
          {title: 'Oval', value: 'oval'},
          {title: 'Live Edge', value: 'live-edge'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      hidden: ({document}) => {
        // Show only for products in the tables category
        return !document?.productCategory || 
               (typeof document.productCategory === 'object' && 
                !('categoryType' in document.productCategory))
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        {
          name: 'weight',
          title: 'Weight',
          type: 'string',
        },
        {
          name: 'color',
          title: 'Color',
          type: 'string',
        },
        {
          name: 'finish',
          title: 'Finish',
          type: 'string',
          options: {
            list: [
              {title: 'Natural Oil', value: 'natural-oil'},
              {title: 'Lacquer', value: 'lacquer'},
              {title: 'Wax', value: 'wax'},
              {title: 'Stain', value: 'stain'},
            ],
          },
        },
        {
          name: 'legShape',
          title: 'Leg Shape',
          type: 'string',
          options: {
            list: [
              {title: 'X Shape', value: 'x-shape'},
              {title: 'Rectangular', value: 'rectangular'},
              {title: 'Custom', value: 'custom'},
            ],
          },
          hidden: ({parent}) => {
            // Show only for table legs
            return !parent?.productCategory?.categoryType || parent.productCategory.categoryType !== 'table-legs'
          },
        },
        {
          name: 'dimensions',
          title: 'Dimensions',
          type: 'string',
          description: 'e.g. "120cm x 80cm x 75cm (L x W x H)"',
        },
      ],
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Important for SEO and accessibility',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'productContent'}],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      categoryTitle: 'productCategory.title',
      price: 'price',
      featured: 'featured',
      inStock: 'inStock',
      media: 'additionalImages.0',
    },
    prepare(selection) {
      const {title, categoryTitle, price, featured, inStock} = selection
      const status = []
      if (featured) status.push('★ Featured')
      if (!inStock) status.push('⚠ Out of Stock')
      
      return {
        title: title,
        subtitle: `${categoryTitle || 'No category'} - $${price}${status.length ? ` (${status.join(', ')})` : ''}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'name', direction: 'asc'},
      ],
    },
    {
      title: 'Price: Low to High',
      name: 'priceAsc',
      by: [{field: 'price', direction: 'asc'}],
    },
    {
      title: 'Price: High to Low',
      name: 'priceDesc',
      by: [{field: 'price', direction: 'desc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})