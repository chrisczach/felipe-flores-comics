import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import {
  Container,
  Link,
  Typography,
  Paper,
  makeStyles,
  Breadcrumbs,
  Box,
  Hidden,
  fade,
  lighten,
} from '@material-ui/core';

import Figure from '../components/figure/figure';

import { getImageInfo } from '../lib/get-image-info';
import ContainedDiv from './contained-div';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
  },
}));

const SlideShow = props => {
  const classes = useStyles(props);
  const {
    projects: { nodes },
  } = useStaticQuery(query);
  const images = nodes.map(
    ({
      mainImage: {
        caption,
        alt,
        asset: { _id: _ref },
      },
    }) => ({ _ref, caption, alt, ...getImageInfo({ _ref }) }),
  );
  return <Box className={classes.root}>{images.map(toBoxes)}</Box>;
};

const toBoxes = ({ _ref, aspectRatio, caption, alt }) => {
  return (
    // <ContainedDiv aspectRatio={aspectRatio}>
    <Figure node={{ asset: { _ref } }} />
    // </ContainedDiv>
  );
};
const query = graphql`
  query SlideShowQuery {
    projects: allSanityProject(
      sort: { fields: [sort, categories___sort], order: [ASC, ASC] }
    ) {
      nodes {
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

export default SlideShow;
