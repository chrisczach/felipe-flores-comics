import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles, Hidden } from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import BlockContent from '../components/block-content';
import SlideShow from '../components/slide-show';
import LinksSection from '../components/links-section';
import AvatarHeading from '../components/avatar-heading';
import HomeLinks from '../components/home-links';

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
      >
        <SEO
          title={site.title}
          description={site.description}
          keywords={site.keywords}
        />
        <h1 hidden>Welcome to {site.title}</h1>
        <AvatarHeading />
        <LinksSection />
        <BlockContent blocks={ page.body } />
        <HomeLinks/>
      </PageContainer>
      <Hidden smDown>
        <SlideShow />
      </Hidden>
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
    page: sanityPage(title: { eq: "Home" }) {
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

export default IndexPage;
