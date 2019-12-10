export default {
  name: 'figure',
  title: 'Image',
  type: 'image',
  fields: [
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    }, {
      title: 'Float',
      name: 'float',
      description: 'This is used for images placed inline. If not set then the image takes up its own line. If set to "left" then it floats to the left of text, if set to "right" it floats to the right.',
      type: 'string',
      options: {
        isHighlighted: true,
        list: [
          { title: 'Float Left', value: 'left' },
          { title: 'Float Right', value: 'right' },
          { title: `Default - Don't Float`, value: '' },
        ]
      },
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule =>
        Rule.error('You have to fill out the alternative text.').required(),
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption',
    },
  },
};
