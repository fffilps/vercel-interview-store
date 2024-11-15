import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'products',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Electronics', value: 'electronics'},
          {title: 'Clothing', value: 'clothing'},
          {title: 'Work', value: 'work'},
          {title: 'Accessories', value: 'accessories'},
        ],
      },
    }),
  ],
})
