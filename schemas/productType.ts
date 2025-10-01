import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productType',
  title: 'Product Type',
  type: 'document',
  description: 'Subcategories for more specific product classification',
  fields: [
    defineField({
      name: 'title',
      title: 'Type Title',
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
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare(selection) {
      const {title, description} = selection
      return {
        title: title,
        subtitle: description || 'No description',
      }
    },
  },
})