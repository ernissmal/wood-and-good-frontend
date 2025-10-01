import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tableSize',
  title: 'Table Size',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Size Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Medium Dining Table", "Large Conference Table"',
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
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        {
          name: 'length',
          title: 'Length (cm)',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'width',
          title: 'Width (cm)',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'height',
          title: 'Height (cm)',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
          initialValue: 75,
        },
        {
          name: 'thickness',
          title: 'Top Thickness (cm)',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
          initialValue: 4,
        },
      ],
    }),
    defineField({
      name: 'suitableShapes',
      title: 'Suitable Shapes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'tableShape'}],
        },
      ],
      description: 'Which table shapes can use this size configuration',
    }),
    defineField({
      name: 'seatingCapacity',
      title: 'Seating Capacity',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum Seats',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'max',
          title: 'Maximum Seats',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'comfortable',
          title: 'Comfortable Seats',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
          description: 'Recommended number of seats for comfort',
        },
      ],
    }),
    defineField({
      name: 'priceMultiplier',
      title: 'Price Multiplier',
      type: 'number',
      validation: (Rule) => Rule.required().min(0.1),
      initialValue: 1.0,
      description: 'Multiplier for base price based on size',
    }),
    defineField({
      name: 'isStandard',
      title: 'Standard Size',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this is a standard size or custom',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
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
      length: 'dimensions.length',
      width: 'dimensions.width',
      height: 'dimensions.height',
      isActive: 'isActive',
      isStandard: 'isStandard',
      seatingCapacity: 'seatingCapacity.comfortable',
    },
    prepare(selection) {
      const {title, length, width, height, isActive, isStandard, seatingCapacity} = selection
      const dimensions = length && width && height ? `${length}×${width}×${height}cm` : 'No dimensions'
      const seating = seatingCapacity ? ` • ${seatingCapacity} seats` : ''
      const type = isStandard ? '' : ' (Custom)'
      
      return {
        title: title,
        subtitle: `${dimensions}${seating}${type}${!isActive ? ' (Inactive)' : ''}`,
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
      title: 'Size (Length)',
      name: 'sizeAsc',
      by: [{field: 'dimensions.length', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})