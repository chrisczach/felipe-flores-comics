import React from 'react';

import {
  makeStyles,
  Hidden,
  List,
  ListItem,
  lighten,
  Fade,
  Box,
  Container,
  Slide,
  Typography,
  Link,
} from '@material-ui/core';
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { useInView } from 'react-intersection-observer';

import { getImageInfo } from '../lib/get-image-info';
import BlockContent from './block-content';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: `${theme.spacing(8)}px auto ${theme.spacing(8)}px auto`,
  },
  innerWrapper: {
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  link: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(3, 6),
    position: 'relative',
    display: 'block',
    border: `${theme.spacing(0.5)}px solid ${theme.palette.primary.main}`,
    // backgroundImage: `radial-gradient(${lighten(
    //   theme.palette.primary.main,
    //   0.4,
    // )} 10%, transparent 10%), radial-gradient(${lighten(
    //   theme.palette.primary.main,
    //   0.45,
    // )} 10%, transparent 10%)`,
    backgroundColor: lighten(theme.palette.secondary.main, 0.5),
    // backgroundPosition: `0 0, 5px 5px`,
    // backgroundSize: `10px 10px`,
  },
  triangle: {
    position: 'relative',
    transform: `translateY(${theme.spacing(-0.5) - 0.5}px)`,
    marginLeft: theme.spacing(8),
    width: theme.spacing(8),
    height: theme.spacing(8),
    overflow: 'hidden',
    borderLeft: `${theme.spacing(0.5)}px solid ${theme.palette.primary.main}`,
    '&::before': {
      content: '""',
      position: 'absolute',
      transform: 'skewX(-45deg)',
      transformOrigin: '0 0',
      top: 0,
      right: theme.spacing(-0.5),
      bottom: 0,
      left: theme.spacing(-0.5),
      border: `${theme.spacing(0.5)}px solid ${theme.palette.primary.main}`,
      borderTop: 'none',
      borderRight: `${theme.spacing(0.75)}px solid ${
        theme.palette.primary.main
      }`,
      // backgroundImage: `radial-gradient(${lighten(
      //   theme.palette.primary.main,
      //   0.4,
      // )} 10%, transparent 10%), radial-gradient(${lighten(
      //   theme.palette.primary.main,
      //   0.45,
      // )} 10%, transparent 10%)`,
      backgroundColor: lighten(theme.palette.secondary.main, 0.5),
      // backgroundPosition: `0 0, 5px 5px`,
      // backgroundSize: `10px 10px`,
    },
  },
  imageWrapper: {
    zIndex: '-1 !important',
    width: theme.spacing(20),
    marginTop: theme.spacing(2),
  },
  image: {
    zIndex: '-1 !important',
  },
}));

const ContactLink = props => {
  const classes = useStyles(props);
  const [ref, inView, entry] = useInView({ threshold: 0.25 });
  const {
    site: {
      mainImage: {
        asset: { _id: _ref },
      },
    },
    page: { excerpt },
  } = useStaticQuery(query);

  const { fluid } = getImageInfo({ _ref });

  return (
    <Container maxWidth="sm" className={classes.wrapper}>
      <div ref={ref}>
        <Slide direction="up" in={inView} timeout={1000}>
          <Fade in={inView} timeout={2000}>
            <Box className={classes.innerWrapper}>
              <Link
                component={GatsbyLink}
                to="/contact/"
                className={classes.link}
              >
                <BlockContent blocks={excerpt} />
              </Link>
              <Box className={classes.triangle} />
            </Box>
          </Fade>
        </Slide>
        <Fade in={inView} timeout={2000}>
          <Box className={classes.imageWrapper}>
            {/* {JSON.stringify(_ref)} */}
            <Img fluid={fluid} className={classes.image} />
          </Box>
        </Fade>
      </div>
    </Container>
  );
};

const query = graphql`
  query ContactLinkQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      mainImage {
        asset {
          _id
        }
      }
    }
    page: sanityPage(title: { eq: "Contact" }) {
      title
      excerpt: _rawExcerpt(resolveReferences: { maxDepth: 5 })
    }
  }
`;
export default ContactLink;
