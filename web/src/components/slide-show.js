import React, { useRef, useState, useEffect, createRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { useInView } from 'react-intersection-observer';

import {
  Container,
  Link,
  Typography,
  Paper,
  ButtonGroup,
  Fade,
  Button,
  makeStyles,
  Slide,
  Breadcrumbs,
  Box,
  Hidden,
  fade,
  lighten,
} from '@material-ui/core';

import {
  SkipNextOutlined,
  SkipPreviousOutlined,
  PlayArrowOutlined,
  PauseOutlined,
} from '@material-ui/icons';
import Figure from './figure/figure';

import { getImageInfo } from '../lib/get-image-info';
import ContainedDiv from './contained-div';

const useStyles = makeStyles( theme => {
  const path =
    'polygon(38% 20%, 36% 9%, 27% 18%, 24% 8%, 14% 14%, 13% 4%, 5% 10%, 0% 0%, 0% 100%, 8% 86%, 16% 92%, 21% 79%, 27% 86%, 33% 78%, 40% 86%, 46% 79%, 55% 86%, 65% 76%, 70% 87%, 79% 78%, 84% 90%, 93% 84%, 100% 100%, 100% 0%, 96% 14%, 87% 7%, 82% 16%, 73% 10%, 69% 20%, 58% 11%, 52% 21%, 46% 12%)';
  return {
    cutout: {
      position: 'relative',
      margin: theme.spacing(-4, 0),
      padding: theme.spacing(24, 0, 20, 0),
      background: theme.palette.secondary.light,
      clipPath: path,
      WebkitClipPath: path,
      // '&:hover': {
      //   background: `linear-gradient(180deg, transparent 20%, ${fade(
      //     theme.palette.primary.dark,
      //     0.25,
      //   )} 40%, ${fade(theme.palette.primary.dark, 0.25)} 60%, transparent 80%)`,
      // },

      '&::before': {
        clipPath: path,
        WebkitClipPath: path,
        position: 'absolute',
        top: theme.spacing(2),
        right: 0,
        bottom: theme.spacing(2),
        left: 0,
        content: '""',
        backgroundColor: lighten(theme.palette.primary.main, 0.25),
      },
    },
    root: {
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      whitespace: 'nowrap',
      touchAction: 'none',
      scrollSnapType: 'mandatory',
      overflow: '-moz-scrollbars-none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        width: '0 !important',
      },
    },
    buttonWrapper: {
      opacity: 0.9,
      '&:hover': {
        opacity: 1,
      },
      margin: theme.spacing(0, 0, 6, 0),
      display: 'flex',
      justifyContent: 'center',
    },
    sliderElement: {
      scrollSnapAlign: 'center',
    },
  };
});

const SlideShow = props => {
  const classes = useStyles(props);
  const {
    projects: { nodes },
  } = useStaticQuery(query);

  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, nodes.length);
  }, [nodes]);

  // figure this out later
  const wrapperRef = createRef();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [playing, setPlaying] = useState(true);

  const togglePlaying = (value = null) =>
    setPlaying(state => (value === null ? !state : value));

  const updateScroll = (value = 1) => {
    setScrollPosition(current => {
      const next =
        current + value === images.length || current + value < 0
          ? 0
          : current + value;
      wrapperRef.current.scroll({
        left: itemsRef.current[next].offsetLeft,
        top: 0,
        behavior: 'smooth',
      });
      return next;
    });
  };

  // const scrollTo = scrollPosition => {
  //   alert(scrollPosition);
  // };

  const [ref, inView, entry] = useInView({ threshold: 0.1 });

  useInterval(() => inView && playing && updateScroll(), 3500);

  const [prevPlaying, setPrevPlaying] = useState(true);

  const handleModalClose = () => {
    togglePlaying(prevPlaying);
  };

  const images = nodes
    .map(({ mainImage: { caption, alt, asset: { _id: _ref } } }) => ({
      _ref,
      caption,
      alt,
      ...getImageInfo({ _ref }),
    }))
    .map((props, i) => (
      <div
        onClick={() => {
          setPrevPlaying(playing);
          togglePlaying(false);
        }}
        ref={el => (itemsRef.current[i] = el)}
        className={classes.sliderElement}
      >
        <ToFigure handleClose={handleModalClose} {...props} />
      </div>
    ));

  return (
    <>
      {/* currentyly at {offset} */}
      <div ref={ref} className={classes.cutout}>
        {/* <Fade direction="up" in={inView} timeout={1000}> */}
        <div ref={wrapperRef} className={classes.root}>
          {images}
        </div>
        {/* </Fade> */}
        <Box className={classes.buttonWrapper}>
          <ButtonGroup color="secondary">
            <Button
              onClick={() => {
                updateScroll(-1);
                togglePlaying(false);
              }}
              startIcon={<SkipPreviousOutlined />}
            >
              Prev
            </Button>
            <Button
              onClick={() =>
                playing ? togglePlaying(false) : togglePlaying(true)
              }
            >
              {playing ? <PauseOutlined /> : <PlayArrowOutlined />}
            </Button>
            <Button
              onClick={() => {
                updateScroll(1);
                togglePlaying(false);
              }}
              endIcon={<SkipNextOutlined />}
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </>
  );
};

const ToFigure = ({ _ref, handleClose = false }) => (
  <div key={_ref}>
    <Figure forSlider node={{ asset: { _ref } }} handleClose={handleClose} />
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
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default SlideShow;
