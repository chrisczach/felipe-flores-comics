import React, { useState, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { makeStyles, lighten, Typography, Box } from '@material-ui/core';

import FigureModal from './figure-modal';
import { ModalUpdater } from '../layout';

const getImageInfo = ({ _ref, edges }) => {
  const {
    node: {
      localFile: {
        childImageSharp: { fluid },
      },
      metadata: {
        dimensions: { aspectRatio },
      },
    },
  } = edges.find(({ node: { _id } }) => _id === _ref);
  return { fluid, aspectRatio };
};

const useStyles = (float = false) =>
  makeStyles(theme => {
    const red = lighten(theme.palette.primary.dark, 0.25);
    const darkYellow = theme.palette.secondary.main;
    return {
      root: {
        cursor: 'pointer',
        display: 'block',
        [theme.breakpoints.up('xl')]: {
          width: `${float ? '40%' : '65%'} !important`,
        },
        margin: theme.spacing(2, 0),
        [theme.breakpoints.up('md')]: {
          margin: `${theme.spacing(2)}px auto`,
          width: float ? '45%' : '50%',
          float: float || 'none ',
          '@media (hover:hover)': {
            '&:hover': {
              boxShadow: theme.shadows[2],
              border: `1px solid ${red}`,
              backgroundImage: `radial-gradient(${lighten(
                theme.palette.primary.light,
                0.7,
              )} 10%, transparent 10%), radial-gradient(${lighten(
                theme.palette.primary.light,
                0.8,
              )} 10%, transparent 10%)`,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              backgroundPosition: `0 0, 5px 5px`,
              backgroundSize: `10px 10px`,
            },
            '&:hover div': {
              overflow: 'hidden',
              '& img': {
                transform: 'scale(1.05)',
                transition: `all 400ms ease-in-out !important`,
              },
            },
            '&:hover figcaption': {
              borderTop: `${theme.spacing(0.2)}px solid ${red}`,
            },
          },
        },

        //   '& div img': {
        //             // wip need to tweak
        //       transition: `transform 400ms ease-in-out !important`,
        // },
      },

      caption: {
        padding: theme.spacing(1, 2, 2, 1),
      },
    };
  });

export default ({ node, ...props }) => {
  if (!node.asset) {
    return null;
  }
  //  Need to figure out how to handle float images
  const classes = useStyles(false && node.float)(props);
  const {
    asset: { _ref },
  } = node;

  const {
    assets: { edges },
  } = useStaticQuery(query);
  const { fluid, aspectRatio } = getImageInfo({ _ref, edges });

  const modalUpdater = useContext(ModalUpdater);
  const openHandler = () =>
    // @ts-ignore
    modalUpdater({
      children: (
        <FigureModal
          {...{
            fluid,
            aspectRatio,
            closeHandler: () => modalUpdater({ open: false, children: null }),
          }}
        />
      ),
    });
  return (
    <>
      <Box component="figure" onClick={openHandler} className={classes.root}>
        <Img fluid={fluid} alt={node.alt} />
        {node.caption && (
          <Box component="figcaption" className={classes.caption}>
            <Typography variant="h5">{node.caption}</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

const query = graphql`
  query BlockImageQuery {
    assets: allSanityImageAsset {
      edges {
        node {
          _id
          metadata {
            dimensions {
              aspectRatio
            }
          }
          localFile(width: 2400) {
            childImageSharp {
              fluid(
                maxWidth: 2400
                traceSVG: { color: "#8b151b77", background: "#ffd83111" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
