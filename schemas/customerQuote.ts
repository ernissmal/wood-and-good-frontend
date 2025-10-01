import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'customerQuote',
  title: 'Customer Quote',
  type: 'document',
  fields: [
    defineField({
      name: 'quoteNumber',
      title: 'Quote Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Auto-generated quote number (e.g., Q-2024-001)',
    }),
    defineField({
      name: 'customerInfo',
      title: 'Customer Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Customer Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'company',
          title: 'Company',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
      ],
    }),
    defineField({
      name: 'tableConfiguration',
      title: 'Table Configuration',
      type: 'reference',
      to: [{type: 'tableConfiguration'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),
    defineField({
      name: 'customizations',
      title: 'Additional Customizations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'description',
              title: 'Customization Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'additionalCost',
              title: 'Additional Cost',
              type: 'number',
              initialValue: 0,
            },
            {
              name: 'additionalTime',
              title: 'Additional Lead Time (days)',
              type: 'number',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              title: 'description',
              cost: 'additionalCost',
              time: 'additionalTime',
            },
            prepare(selection) {
              const {title, cost, time} = selection
              const costText = cost ? ` (+$${cost})` : ''
              const timeText = time ? ` (+${time} days)` : ''
              return {
                title: title,
                subtitle: `${costText}${timeText}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Details',
      type: 'object',
      fields: [
        {
          name: 'basePrice',
          title: 'Base Price (per unit)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'customizationCosts',
          title: 'Total Customization Costs',
          type: 'number',
          initialValue: 0,
        },
        {
          name: 'subtotal',
          title: 'Subtotal',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'discount',
          title: 'Discount',
          type: 'object',
          fields: [
            {
              name: 'amount',
              title: 'Discount Amount',
              type: 'number',
              initialValue: 0,
            },
            {
              name: 'percentage',
              title: 'Discount Percentage',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100),
              initialValue: 0,
            },
            {
              name: 'reason',
              title: 'Discount Reason',
              type: 'string',
            },
          ],
        },
        {
          name: 'tax',
          title: 'Tax Amount',
          type: 'number',
          initialValue: 0,
        },
        {
          name: 'shipping',
          title: 'Shipping Cost',
          type: 'number',
          initialValue: 0,
        },
        {
          name: 'totalPrice',
          title: 'Total Price',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'object',
      fields: [
        {
          name: 'estimatedLeadTime',
          title: 'Estimated Lead Time (days)',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'quoteValidUntil',
          title: 'Quote Valid Until',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'estimatedDelivery',
          title: 'Estimated Delivery Date',
          type: 'date',
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Quote Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Sent to Customer', value: 'sent'},
          {title: 'Customer Viewed', value: 'viewed'},
          {title: 'Under Review', value: 'under-review'},
          {title: 'Accepted', value: 'accepted'},
          {title: 'Rejected', value: 'rejected'},
          {title: 'Expired', value: 'expired'},
          {title: 'Converted to Order', value: 'converted'},
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 4,
      description: 'Internal notes about this quote',
    }),
    defineField({
      name: 'customerNotes',
      title: 'Customer Notes',
      type: 'text',
      rows: 3,
      description: 'Notes from the customer about their requirements',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      quoteNumber: 'quoteNumber',
      customerName: 'customerInfo.name',
      totalPrice: 'pricing.totalPrice',
      status: 'status',
      createdAt: 'createdAt',
    },
    prepare(selection) {
      const {quoteNumber, customerName, totalPrice, status, createdAt} = selection
      const date = createdAt ? new Date(createdAt).toLocaleDateString() : ''
      const price = totalPrice ? `$${totalPrice}` : 'No price'
      const statusText = status ? status.toUpperCase() : 'UNKNOWN'
      
      return {
        title: `${quoteNumber} - ${customerName || 'Unknown Customer'}`,
        subtitle: `${price} • ${statusText} • ${date}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{field: 'status', direction: 'asc'}],
    },
    {
      title: 'Total Price: High to Low',
      name: 'priceDesc',
      by: [{field: 'pricing.totalPrice', direction: 'desc'}],
    },
    {
      title: 'Customer Name A-Z',
      name: 'customerNameAsc',
      by: [{field: 'customerInfo.name', direction: 'asc'}],
    },
  ],
})