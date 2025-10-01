import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tableQuality',
  title: 'Table Quality Grade',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Quality Name',
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
      name: 'grade',
      title: 'Quality Grade',
      type: 'string',
      options: {
        list: [
          {title: 'PRIME', value: 'prime'},
          {title: 'CHARACTER', value: 'character'},
          {title: 'RUSTIC', value: 'rustic'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Detailed description of this quality grade characteristics',
    }),
    defineField({
      name: 'characteristics',
      title: 'Quality Characteristics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'feature',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'exampleImages',
      title: 'Example Images',
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
              description: 'Optional caption explaining what this image shows',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'qualityAdjustment',
      title: 'Quality Price Adjustment (%)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(100),
      initialValue: 0,
      description: 'Percentage adjustment amount (always positive)',
    }),
    defineField({
      name: 'priceDirection',
      title: 'Price Direction',
      type: 'string',
      options: {
        list: [
          {title: 'Add to price', value: 'add'},
          {title: 'Subtract from price', value: 'subtract'},
        ],
      },
      initialValue: 'add',
      description: 'Whether to add or subtract the adjustment percentage',
    }),
    defineField({
      name: 'realWorldMultiplier',
      title: 'Real World Multiplier',
      type: 'number',
      description: 'Actual multiplier calculated from real pricing data',
      readOnly: true,
    }),
    defineField({
      name: 'priceMultiplier',
      title: 'Price Multiplier (Legacy)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0.1),
      initialValue: 1.0,
      description: 'Legacy multiplier - kept for backward compatibility',
      readOnly: true,
    }),
    defineField({
      name: 'qualityScore',
      title: 'Quality Score',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
      description: 'Internal quality rating from 1-10 (10 being highest)',
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
      grade: 'grade',
      subtitle: 'description',
      media: 'exampleImages.0',
      isActive: 'isActive',
      priceMultiplier: 'priceMultiplier',
      qualityScore: 'qualityScore',
    },
    prepare(selection) {
      const {title, grade, subtitle, isActive, priceMultiplier, qualityScore} = selection
      const gradeText = grade ? ` (${grade.toUpperCase()})` : ''
      const priceInfo = priceMultiplier !== 1.0 ? ` • ${priceMultiplier}x price` : ''
      const scoreInfo = qualityScore ? ` • Score: ${qualityScore}/10` : ''
      
      return {
        title: title + gradeText,
        subtitle: `${subtitle || 'No description'}${priceInfo}${scoreInfo}${!isActive ? ' (Inactive)' : ''}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Quality Score (High to Low)',
      name: 'qualityDesc',
      by: [{field: 'qualityScore', direction: 'desc'}],
    },
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
    {
      title: 'Price Multiplier',
      name: 'priceMultiplier',
      by: [{field: 'priceMultiplier', direction: 'desc'}],
    },
  ],
})