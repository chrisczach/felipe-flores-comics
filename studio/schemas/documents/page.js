import { format } from 'date-fns';

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      description:
        'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      validation: Rule => Rule.required(),
      type: 'simplePortableText',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      validation: Rule => Rule.required(),
      type: 'figure',
    },
    {
      name: 'body',
      validation: Rule => Rule.required(),
      title: 'Body',
      type: 'projectPortableText',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare({ title = 'No title', slug = {}, media }) {
      return {
        title,
        media,
      };
    },
  },
};
