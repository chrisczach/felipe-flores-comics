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
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
      type: 'simplePortableText',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure',
    },
    {
      name: 'body',
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
