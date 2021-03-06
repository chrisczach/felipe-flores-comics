export default {
  name: 'category',
  title: 'Category',
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
      name: 'sort',
      title: 'Sort',
      description: 'Sort order for categories',
      type: 'number',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      validation: Rule => Rule.required(),
      type: 'simplePortableText',
    },
    {
      name: 'mainImage',
      validation: Rule => Rule.required(),
      title: 'Main image',
      type: 'figure',
    },
    {
      name: 'body',
      title: 'Body',
      validation: Rule => Rule.required(),
      type: 'projectPortableText',
    },
  ],
  orderings: [
    {
      title: 'Site Order',
      name: 'siteOrder',
      by: [
        {field: 'sort', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      media: 'mainImage',
    },
    prepare({ title = 'No title', slug = {}, media }) {
      // const path = `/${dateSegment}/${slug.current}/`;
      return {
        title,
        media,
        // subtitle: publishedAt ? path : 'Missing publishing date',
      };
    },
  },
};
