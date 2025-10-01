import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tableMaterial',
  title: 'Table Material',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Material Name',
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
      rows: 4,
      description: 'Detailed description of the material properties and characteristics',
    }),
    defineField({
      name: 'image',
      title: 'Material Sample Image',
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
      name: 'properties',
      title: 'Material Properties',
      type: 'object',
      fields: [
        {
          name: 'hardness',
          title: 'Hardness Level',
          type: 'string',
          options: {
            list: [
              {title: 'Soft', value: 'soft'},
              {title: 'Medium', value: 'medium'},
              {title: 'Hard', value: 'hard'},
            ],
          },
        },
        {
          name: 'grainPattern',
          title: 'Grain Pattern',
          type: 'string',
          description: 'Description of the wood grain pattern',
        },
        {
          name: 'colorRange',
          title: 'Color Range',
          type: 'string',
          description: 'Natural color variations of this material',
        },
        {
          name: 'durability',
          title: 'Durability Rating',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(10),
          description: 'Durability rating from 1-10',
        },
      ],
    }),
    defineField({
      name: 'priceMultiplier',
      title: 'Price Multiplier',
      type: 'number',
      validation: (Rule) => Rule.required().min(0.1),
      initialValue: 1.0,
      description: 'Multiplier for base price (e.g., 1.5 means 50% more expensive)',
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
      subtitle: 'description',
      media: 'image',
      isActive: 'isActive',
      priceMultiplier: 'priceMultiplier',
    },
    prepare(selection) {
      const {title, subtitle, isActive, priceMultiplier} = selection
      const priceInfo = priceMultiplier !== 1.0 ? ` (${priceMultiplier}x price)` : ''
      return {
        title: title,
        subtitle: `${subtitle || 'No description'}${priceInfo}${!isActive ? ' (Inactive)' : ''}`,
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
      title: 'Price Multiplier',
      name: 'priceMultiplier',
      by: [{field: 'priceMultiplier', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})