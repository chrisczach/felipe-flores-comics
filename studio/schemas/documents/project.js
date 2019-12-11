import { format } from 'date-fns';

export default {
  name: 'project',
  title: 'Project',
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
    // {
    //   name: 'publishedAt',
    //   title: 'Published at',
    //   description:
    //     'You can use this field to schedule projects where you show them',
    //   type: 'datetime',
    // },
    {
      name: 'excerpt',
      title: 'Excerpt',
      validation: Rule => Rule.required(),
      type: 'simplePortableText',
    },
    // {
    //   name: 'members',
    //   title: 'Members',
    //   type: 'array',
    //   of: [{ type: 'projectMember' }],
    // },
    // {
    //   name: 'startedAt',
    //   title: 'Started at',
    //   type: 'datetime',
    // },
    // {
    //   name: 'endedAt',
    //   title: 'Ended at',
    //   type: 'datetime',
    // },
    {
      name: 'mainImage',
      title: 'Main image',
      validation: Rule => Rule.required(),
      type: 'figure',
    },
    {
      name: 'categories',
      title: 'Categories',
      validation: Rule => Rule.required(),
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText',
    },
    {
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      media: 'mainImage',
    },
    prepare({ title = 'No title', slug = {}, media }) {
      const path = `/projects/${slug.current}/`;
      return {
        title,
        media,
        subtitle: path,
      };
    },
  },
};
