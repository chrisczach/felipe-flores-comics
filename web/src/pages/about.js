import React from 'react';
import { graphql, Link } from 'gatsby';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const AboutPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <PageContainer pageTitle="About Felipe">
        <GraphQLErrorList errors={errors} />
      </PageContainer>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects ? ['to', 'an', 'array'] : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <PageContainer pageTitle="About Felipe">
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>About {site.title}</h1>
      <div>About Page Starting</div>
      <Link to="/">Home</Link>
    </PageContainer>
  );
};

export default AboutPage;
