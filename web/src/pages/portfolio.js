import React from 'react';
import { graphql, Link } from 'gatsby';

import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import GraphQLErrorList from '../components/graphql-error-list';

export const query = graphql`
  query PortfolioPageQuery {
    projects: allSanityProject(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
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

const PortfolioPage = props => {
  const { data, errors } = props;
  if (errors) {
    return (
      <PageContainer pageTitle="Portfolio">
        <GraphQLErrorList errors={errors} />
      </PageContainer>
    );
  }
  const projectNodes = data && data.projects && [];
  return (
    <PageContainer pageTitle="Portfolio">
      <SEO title="Portfolio" />

      <div>Portfolio Page Starting</div>
      <Link to="/">Home</Link>
    </PageContainer>
  );
};

export default PortfolioPage;
