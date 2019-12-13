import React, { useRef, useState, useEffect, createRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import {
  Container,
  Link,
  Typography,
  Paper,
  ButtonGroup,
  Button,
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

  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, nodes.length);
  }, [nodes]);

  const images = nodes
    .map(({ mainImage: { caption, alt, asset: { _id: _ref } } }) => ({
      _ref,
      caption,
      alt,
      ...getImageInfo({ _ref }),
    }))
    .map((props, i) => (
      <div ref={el => (itemsRef.current[i] = el)}>
        <ToFigure {...props} />
      </div>
    ));

  // figure this out later
  const wrapperRef = createRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [playing, setPlaying] = useState(true);
  const togglePlaying = () => setPlaying(state => !state);

  const updateScroll = () => {
    if (playing) {
      wrapperRef.current.scroll({
        left: itemsRef.current[scrollPosition].offsetLeft,
        top: 0,
        behavior: 'smooth',
      });
      setScrollPosition(current =>
        current === images.length ? 0 : current + 1,
      );
    }
  };

  // const scrollTo = scrollPosition => {
  //   alert(scrollPosition);
  // };

  useInterval(updateScroll, 3500);

  return (
    <>
      {/* currentyly at {offset} */}
      <div ref={wrapperRef} className={classes.root}>
        {images}
      </div>
      <ButtonGroup>
        <Button>Prev</Button>
        <Button onClick={togglePlaying}>Play / Pause</Button>
        <Button>Next</Button>
      </ButtonGroup>
    </>
  );
};

const ToFigure = ({ _ref, aspectRatio, caption, alt }) => (
  <div>
    <Figure forSlider node={{ asset: { _ref } }} />
  </div>
);

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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default SlideShow;
