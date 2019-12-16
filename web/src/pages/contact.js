import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import BlockContent from '../components/block-content';
import LinksSection from '../components/links-section';
import AvatarHeading from '../components/avatar-heading';

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

const ContactPage = props => {
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
      breadcrumbs={[{ slug: '/contact/', title: 'Contact' }]}
    >
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>Welcome to {site.title}</h1>
      {/* <AvatarHeading/> */}
      <LinksSection />
      <BlockContent blocks={page.body} />
      {/* <Img fluid={heroImageFluid} fadeIn durationFadeIn={1000} /> */}
    </PageContainer>
  );
};

export const query = graphql`
  query ContactPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(title: { eq: "Contact" }) {
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
  }
`;

export default ContactPage;
