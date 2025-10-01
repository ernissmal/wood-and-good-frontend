import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'categoryType',
      title: 'Category Type',
      type: 'string',
      initialValue: 'content',
      readOnly: true,
      description: 'All blog categories are content type',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category should appear (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
      displayOrder: 'displayOrder',
      media: 'image',
    },
    prepare(selection) {
      const {title, displayOrder} = selection
      return {
        title: title,
        subtitle: displayOrder !== undefined ? `Order: ${displayOrder}` : 'No display order',
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        {field: 'displayOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Alphabetical',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})