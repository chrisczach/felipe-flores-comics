export default {
  name: 'siteLink',
  title: 'Site Link',
  type: 'object',
  fields: [
    {
      name: 'linkTitle',
      title: 'Link Title',
      type: 'string',
    },
    {
      name: 'linkUrl',
      title: 'Link Url',
      type: 'url',
      validation: Rule => Rule.uri({ scheme: ['https', 'http', 'mailto'] }),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
    },
  ],
};
