import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50)
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true // Enables UI for selecting what areas of an image should be cropped
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    })
  ]
})
