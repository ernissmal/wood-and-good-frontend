import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
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
      options: {
        list: [
          {title: 'Tables', value: 'tables'},
          {title: 'Table Legs', value: 'table-legs'},
          {title: 'Other Products', value: 'other'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'string',
      description: 'Optional parent category for subcategorization',
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
      categoryType: 'categoryType',
      media: 'image',
    },
    prepare(selection) {
      const {title, categoryType} = selection
      return {
        title: title,
        subtitle: categoryType ? `Type: ${categoryType}` : 'No category type',
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Category Type, A-Z',
      name: 'categoryTypeAsc',
      by: [
        {field: 'categoryType', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        {field: 'displayOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
})