export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish',
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subitle',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description:
        'Describe your portfolio for search engines and social media.',
    },
    {
      name: 'footerText',
      title: 'Footer Text',
      type: 'projectPortableText',
    },
    {
      name: 'linksList',
      title: 'Links List',
      type: 'array',
      of: [{ type: 'siteLink' }],
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      validation: Rule => Rule.required(),
      type: 'figure',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your portfolio.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
};
