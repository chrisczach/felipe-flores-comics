import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import BlockContent from '../components/block-content';
import ProjectGrid from '../components/projects/project-grid';

const useStyles = makeStyles(theme => ({}));

const PortfolioPage = props => {
  const { data, errors } = props;
  const classes = useStyles(props);
  if (errors) {
    return (
      <>
        <GraphQLErrorList errors={errors} />
      </>
    );
  }

  const { site } = data || {};
  const { page } = data || {};
  const projects = (data || {}).projects.nodes;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <PageContainer
      pageTitle={page.title}
      heroImage={page.heroImage}
      breadcrumbs={[{ slug: '/portfolio/', title: 'Portfolio' }]}
    >
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>Welcome to {site.title}</h1>

      <BlockContent blocks={page.body} />
      <ProjectGrid {...{ projects }} />
    </PageContainer>
  );
};

export const query = graphql`
  query PortfolioPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "portfolio" } }) {
      title
      excerpt: _rawExcerpt(resolveReferences: { maxDepth: 5 })
      body: _rawBody(resolveReferences: { maxDepth: 5 })
      heroImage: mainImage {
        caption
        alt
        asset {
          _id
        }
      }
    }
    projects: allSanityCategory(sort: { fields: [sort] }) {
      nodes {
        id
        title
        slug {
          current
        }
        excerpt: _rawExcerpt(resolveReferences: { maxDepth: 5 })
        mainImage {
          caption
          alt
          asset {
            _id
          }
        }
      }
    }
  }
`;

export default PortfolioPage;
