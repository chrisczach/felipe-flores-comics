import React, { useRef, useState, useEffect } from 'react';
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
    overflowX: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    whitespace: 'nowrap',
    WebkitOverflowScrolling: 'touch',
    scrollSnapType: 'mandatory',
  },
}));

const SlideShow = props => {
  const classes = useStyles(props);
  const {
    projects: { nodes },
  } = useStaticQuery(query);
  const images = nodes
    .map(({ mainImage: { caption, alt, asset: { _id: _ref } } }) => ({
      _ref,
      caption,
      alt,
      ...getImageInfo({ _ref }),
    }))
    .map(toBoxWithRef);

  
  // figure this out later

  // const [scrollPosition, setScrollPosition] = useState(0);
  // const updateScroll = () => () => setScrollPosition(current => current + 1);
  // const scrollTo = scrollPosition => {
  //   alert(scrollPosition);
  // };

  // useEffect(() => {
  //   scrollTo(scrollPosition);
  //   const interval = setInterval(updateScroll, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [updateScroll]);

  return (
    <Box className={classes.root}>
      {images.map(({ component }) => component)}
    </Box>
  );
};

const toBoxWithRef = ({ _ref, aspectRatio, caption, alt }) => {
  const ref = useRef();
  return {
    ref,
    component: <Figure ref={ref} forSlider node={{ asset: { _ref } }} />,
  };
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
