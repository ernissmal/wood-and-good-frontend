import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tableShape',
  title: 'Table Shape',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Shape Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
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
      name: 'image',
      title: 'Shape Illustration',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'areaMultiplier',
      title: 'Area Efficiency Multiplier',
      type: 'number',
      validation: (Rule) => Rule.required().min(0.1).max(2),
      initialValue: 1.0,
      description: 'Multiplier based on material efficiency vs rectangular (e.g., 0.785 for round/oval)',
    }),
    defineField({
      name: 'hasRealData',
      title: 'Has Real Pricing Data',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this shape has actual manufacturer pricing data',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, isActive} = selection
      return {
        title: title,
        subtitle: `${subtitle || 'No description'}${!isActive ? ' (Inactive)' : ''}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})