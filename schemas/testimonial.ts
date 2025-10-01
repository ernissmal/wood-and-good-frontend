import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerLocation',
      title: 'Customer Location',
      type: 'string',
      description: 'e.g. "London, UK" or "New York, USA"',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productPurchased',
      title: 'Product Purchased',
      type: 'string',
      description: 'Name of the product this testimonial is about',
    }),
    defineField({
      name: 'testimonialType',
      title: 'Testimonial Type',
      type: 'string',
      options: {
        list: [
          {title: 'B2C (Business to Consumer)', value: 'B2C'},
          {title: 'B2B (Business to Business)', value: 'B2B'},
        ],
        layout: 'radio',
      },
      initialValue: 'B2C',
      validation: (Rule) => Rule.required(),
      description: 'Internal categorization - not visible to website users',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
      description: 'Featured testimonials appear on the homepage and category pages',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Only published testimonials are visible on the website',
    }),
    defineField({
      name: 'customerImage',
      title: 'Customer Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for accessibility',
        },
      ],
    }),
    defineField({
      name: 'dateReceived',
      title: 'Date Received',
      type: 'date',
      description: 'When this testimonial was received',
    }),
  ],
  preview: {
    select: {
      customerName: 'customerName',
      testimonialType: 'testimonialType',
      rating: 'rating',
      featured: 'featured',
      published: 'published',
      media: 'customerImage',
    },
    prepare(selection) {
      const {customerName, testimonialType, rating, featured, published} = selection
      const stars = '★'.repeat(rating || 0)
      const status = []
      if (featured) status.push('Featured')
      if (!published) status.push('Draft')
      
      return {
        title: customerName,
        subtitle: `${testimonialType} - ${stars}${status.length ? ` (${status.join(', ')})` : ''}`,
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
        {field: 'rating', direction: 'desc'},
        {field: '_createdAt', direction: 'desc'},
      ],
    },
    {
      title: 'Rating: High to Low',
      name: 'ratingDesc',
      by: [{field: 'rating', direction: 'desc'}],
    },
    {
      title: 'Date Received: New to Old',
      name: 'dateReceivedDesc',
      by: [{field: 'dateReceived', direction: 'desc'}],
    },
    {
      title: 'Customer Name A-Z',
      name: 'customerNameAsc',
      by: [{field: 'customerName', direction: 'asc'}],
    },
  ],
})