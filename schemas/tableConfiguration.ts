import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tableConfiguration',
  title: 'Table Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Configuration Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal name for this table configuration',
    }),
    defineField({
      name: 'baseProduct',
      title: 'Base Product',
      type: 'reference',
      to: [{type: 'productContent'}],
      validation: (Rule) => Rule.required(),
      description: 'The base table product this configuration applies to',
    }),
    defineField({
      name: 'shape',
      title: 'Table Shape',
      type: 'reference',
      to: [{type: 'tableShape'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'reference',
      to: [{type: 'tableMaterial'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'reference',
      to: [{type: 'tableSize'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quality',
      title: 'Quality Grade',
      type: 'reference',
      to: [{type: 'tableQuality'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customDimensions',
      title: 'Custom Dimensions',
      type: 'object',
      fields: [
        {
          name: 'isCustom',
          title: 'Has Custom Dimensions',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'length',
          title: 'Custom Length (cm)',
          type: 'number',
          validation: (Rule) => Rule.min(1),
          hidden: ({parent}) => !parent?.isCustom,
        },
        {
          name: 'width',
          title: 'Custom Width (cm)',
          type: 'number',
          validation: (Rule) => Rule.min(1),
          hidden: ({parent}) => !parent?.isCustom,
        },
        {
          name: 'height',
          title: 'Custom Height (cm)',
          type: 'number',
          validation: (Rule) => Rule.min(1),
          hidden: ({parent}) => !parent?.isCustom,
        },
        {
          name: 'customPriceAdjustment',
          title: 'Custom Size Price Adjustment (%)',
          type: 'number',
          description: 'Additional percentage added to base price for custom sizing',
          initialValue: 15,
          hidden: ({parent}) => !parent?.isCustom,
        },
      ],
    }),
    defineField({
      name: 'calculatedPrice',
      title: 'Calculated Price',
      type: 'number',
      readOnly: true,
      description: 'Auto-calculated based on base price and multipliers',
    }),
    defineField({
      name: 'priceOverride',
      title: 'Price Override',
      type: 'number',
      description: 'Optional: Override the calculated price with a fixed amount',
    }),
    defineField({
      name: 'additionalOptions',
      title: 'Additional Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'optionName',
              title: 'Option Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },
            {
              name: 'priceAdjustment',
              title: 'Price Adjustment',
              type: 'number',
              description: 'Additional cost for this option',
            },
            {
              name: 'isRequired',
              title: 'Required Option',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'optionName',
              subtitle: 'description',
              priceAdjustment: 'priceAdjustment',
            },
            prepare(selection) {
              const {title, subtitle, priceAdjustment} = selection
              const price = priceAdjustment ? ` (+$${priceAdjustment})` : ''
              return {
                title: title,
                subtitle: `${subtitle || 'No description'}${price}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Configuration Images',
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      description: 'Images showing this specific configuration',
    }),
    defineField({
      name: 'estimatedLeadTime',
      title: 'Estimated Lead Time (days)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description: 'Production time in days for this configuration',
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for Order',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes about this configuration',
    }),
  ],
  preview: {
    select: {
      baseName: 'baseProduct.name',
      shapeName: 'shape.name',
      materialName: 'material.name',
      sizeName: 'size.name',
      qualityName: 'quality.name',
      calculatedPrice: 'calculatedPrice',
      priceOverride: 'priceOverride',
      isAvailable: 'isAvailable',
      media: 'images.0',
    },
    prepare(selection) {
      const {baseName, shapeName, materialName, sizeName, qualityName, calculatedPrice, priceOverride, isAvailable} = selection
      const price = priceOverride || calculatedPrice
      const priceText = price ? ` - $${price}` : ''
      const availabilityText = !isAvailable ? ' (Unavailable)' : ''
      
      return {
        title: `${baseName || 'Unknown Product'} Configuration`,
        subtitle: `${shapeName} • ${materialName} • ${sizeName} • ${qualityName}${priceText}${availabilityText}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Price: Low to High',
      name: 'priceAsc',
      by: [{field: 'calculatedPrice', direction: 'asc'}],
    },
    {
      title: 'Price: High to Low',
      name: 'priceDesc',
      by: [{field: 'calculatedPrice', direction: 'desc'}],
    },
    {
      title: 'Lead Time',
      name: 'leadTime',
      by: [{field: 'estimatedLeadTime', direction: 'asc'}],
    },
  ],
})