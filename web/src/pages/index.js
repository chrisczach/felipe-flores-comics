import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles, Hidden, Container } from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import BlockContent from '../components/block-content';
import SlideShow from '../components/slide-show';
import LinksSection from '../components/links-section';
import AvatarHeading from '../components/avatar-heading';
import PortfolioLink from '../components/portfolio-link';
import ContactLink from '../components/contact-link';
import HomeSubBanner from '../components/home-sub-banner';

const useStyles = makeStyles(theme => ({}));

const IndexPage = props => {
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
    <>
      <PageContainer
        // pageTitle={ page.title }
        heroImage={page.heroImage}
        subHeader={<HomeSubBanner />}
      >
        <SEO
          title={site.title}
          description={site.description}
          keywords={site.keywords}
        />
        <h1 hidden>Welcome to {site.title}</h1>
        {/* <AvatarHeading /> */}
        {/* <LinksSection /> */}
        <Container maxWidth="md">
          <BlockContent blocks={page.body} />
        </Container>
        <PortfolioLink />
      </PageContainer>
      <Hidden smDown>
        <SlideShow />
      </Hidden>
      <ContactLink />
    </>
  );
};

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "/" } }) {
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

export default IndexPage;
