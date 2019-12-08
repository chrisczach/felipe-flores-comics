import React from 'react';
import { graphql, Link } from 'gatsby';
import {
  Container,
  Paper,
  Collapse,
  Typography,
  TextField,
  Zoom,
  fade,
  Fade,
  Grow,
  Slide,
  Breadcrumbs,
  Box,
  Button,
  makeStyles,
} from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';

const useStyles = makeStyles(theme => ({
  hero: {
    background: `linear-gradient(155deg, ${fade(
      theme.palette.secondary.dark,
      0.2,
    )} 50%, ${fade(theme.palette.secondary.light, 0.1)} 50%)`,
    backgroundAttachment: 'fixed',
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

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

  const site = (data || {}).site;
  const page = (data || {}).page;
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <PageContainer
      pageTitle={page.title}
      hero={
        <Paper color="primary" square className={classes.hero}>
          <Typography variant="h1" color="primary">
            ¡HERO IMAGE!
          </Typography>
        </Paper>
      }
    >
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>Welcome to {site.title}</h1>
      {JSON.stringify(page.body)}
    </PageContainer>
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
          fluid(maxWidth: 2400) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

export default IndexPage;
