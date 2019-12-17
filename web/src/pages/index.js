import React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';

import {
  makeStyles,
  Hidden,
  Container,
  Typography,
  lighten,
  Link,
} from '@material-ui/core';

import { DoubleArrowOutlined } from '@material-ui/icons';

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

const useStyles = makeStyles(theme => {
  const red = lighten(theme.palette.primary.dark, 0.35);
  const darkRed = lighten(theme.palette.primary.dark, 0.2);
  return {
    overlay: {
      transform: `skewX(-45deg) translateX(${theme.spacing(20)}px)`,
      transformOrigin: '0 0',
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundImage: `radial-gradient(${lighten(
        theme.palette.primary.dark,
        0.15,
      )} 10%, transparent 10%), radial-gradient(${red} 10%, transparent 10%)`,
      background: darkRed,
      backgroundPosition: `0 0, 5px 5px`,
      backgroundSize: `10px 10px`,
      borderLeft: `${theme.spacing(2)}px solid ${red}`,
      borderTop: `${theme.spacing(0.5)}px solid ${lighten(red, 0.15)}`,
      padding: theme.spacing(1, 24, 1, 4),
    },
    overlayText: {
      fontVariant: 'small-caps',
      transform: `skewX(45deg)`,
      transformOrigin: '0 0',
      color: theme.palette.getContrastText(darkRed),
    },
  };
});

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
        heroOverlay={
          <Link
            component={GatsbyLink}
            to="portfolio"
            className={classes.overlay}
          >
            <Typography variant="h5" className={classes.overlayText}>
              Portfolio »
            </Typography>
          </Link>
        }
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
