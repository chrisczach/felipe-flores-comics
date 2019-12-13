import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import BlockContent from '../components/block-content';
import LinksSection from '../components/links-section';

const useStyles = makeStyles(theme => ({
  hero: {
    backgroundAttachment: 'fixed',
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const AboutPage = props => {
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

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <PageContainer
      pageTitle={page.title}
      heroImage={page.heroImage}
      breadcrumbs={[{ slug: '/about/', title: 'About' }]}
    >
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>Welcome to {site.title}</h1>
      <LinksSection />
      <BlockContent blocks={page.body} />
    </PageContainer>
  );
};

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(title: { eq: "About" }) {
      title
      excerpt: _rawExcerpt
      body: _rawBody
      heroImage: mainImage {
        caption
        alt
        asset {
          _id
        }
      }
    }
  }
`;

export default AboutPage;
