export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio',
      },
    },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5de92316818d9eb5fa871469',
                  title: 'Sanity Studio',
                  name: 'felipe-flores-comics-studio',
                  apiId: '4969127d-05e8-4a1c-a69b-c7950809662e',
                },
                {
                  buildHookId: '5de92316653fa3e0c9f3d4f3',
                  title: 'Portfolio Website',
                  name: 'felipe-flores-comics',
                  apiId: 'd2db1903-d6e3-40f0-b0ae-9f05b95f002f',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/chrisczach/felipe-flores-comics',
            category: 'Code',
          },
          {
            title: 'Frontend',
            value: 'https://felipe-flores-comics.netlify.com',
            category: 'apps',
          },
        ],
      },
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: {
        title: 'Recent projects',
        order: '_createdAt desc',
        types: ['project'],
      },
      layout: { width: 'medium' },
    },
  ],
};
