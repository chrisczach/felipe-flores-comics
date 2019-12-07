import React from 'react';
import { graphql, Link } from 'gatsby';
import {
  Container,
  Paper,
  Collapse,
  Typography,
  TextField,
  Zoom,
  Fade,
  Grow,
  Slide,
  Breadcrumbs,
  Box,
  Button,
} from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';

export const query = graphql`
  query IndexPageQuery {
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

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <>
        <GraphQLErrorList errors={errors} />
      </>
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
    <PageContainer pageTitle="Home">
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>Welcome to {site.title}</h1>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="body1">
        Doggo ipsum long woofer very hand that feed shibe floofs h*ck doge blop
        shoob such treat borking doggo what a nice floof, stop it fren h*ck
        doing me a frighten puggorino clouds dat tungg tho borkf. Heckin angery
        woofer pupperino smol borking doggo with a long snoot for pats borking
        doggo, clouds big ol. Smol snoot vvv fluffer, porgo long doggo
        doggorino, length boy very hand that feed shibe. Mlem maximum borkdrive
        blep fluffer, wrinkler.
      </Typography>
      <Typography variant="body1">
        Borking doggo aqua doggo sub woofer shibe you are doing me a frighten,
        you are doing me the shock you are doin me a concern. Shoob yapper
        pupperino length boy waggy wags bork porgo, very taste wow shoob blep
        smol I am bekom fat, many pats corgo heckin good boys shoober pupper.
        You are doin me a concern yapper clouds very jealous pupper, vvv the
        neighborhood pupper. Many pats sub woofer heck long water shoob pats
        many pats aqua doggo very good spot he made many woofs, aqua doggo
        maximum borkdrive shooberino boofers blep bork. Thicc bork very hand
        that feed shibe I am bekom fat wow such tempt borking doggo, extremely
        cuuuuuute smol borking doggo with a long snoot for pats fat boi. Aqua
        doggo very hand that feed shibe you are doing me the shock wow such
        tempt extremely cuuuuuute you are doing me a frighten, borkf very taste
        wow very good spot. Ruff corgo much ruin diet doge, you are doing me a
        frighten borking doggo.
      </Typography>
      <Typography variant="body1">
        Shoober you are doing me the shock fat boi borkf corgo long doggo,
        heckin heck shoober. Puggorino borkdrive pupperino big ol, you are doing
        me the shock mlem. H*ck doggo much ruin diet, noodle horse. Heckin
        angery woofer pats wow very biscit shoob many pats heckin good boys long
        doggo, long woofer what a nice floof floofs tungg. Heck mlem blep length
        boy the neighborhood pupper, shibe borking doggo corgo very taste wow,
        fat boi heckin angery woofer blop.
      </Typography>
      <Link to="about">About</Link>
      <Link to="portfolio">Portfolio</Link>
    </PageContainer>
  );
};

export default IndexPage;
