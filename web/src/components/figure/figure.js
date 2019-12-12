import React, { useState, useEffect, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { makeStyles, lighten, Typography, Box, fade,darken } from '@material-ui/core';

import FigureModal from './figure-modal';
import { ModalUpdater } from '../layout';
import { getImageInfo } from '../../lib/get-image-info';
import ContainedDiv from '../contained-div';

const useStyles = (float = false) =>
  makeStyles(theme => {
    const red = lighten(theme.palette.primary.dark, 0.25);
    const darkYellow = theme.palette.secondary.main;
    return {
      root: {
        cursor: 'pointer',
        display: 'block',
        background: 'transparent',
        '&:after': {
          zIndex: -15,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'transparent',
          content: '""',
        },
        margin: theme.spacing(2, 0),
        '@media (hover:hover)': {
          '&:hover div:after': {
            transform: 'translateX(0) scaleX(1) skewX(-45deg)',
transition: 'all 500ms ease-out',
            background: `linear-gradient(-90deg, ${red} 35%, ${darkYellow} 35% )`,
          },
          '& div:after': {
            transition: 'all 1000ms ease-out',
            content: '""',
            position: 'absolute',
            right: theme.spacing(-1),
            bottom: 0,
            left: theme.spacing(-1),
            height: theme.spacing(1),
            background: `linear-gradient(-90deg, ${darken(red,.25)} 35%, transparent 35% )`,
            transform: 'translateX(-50%) scaleX(0) skewX(0)',
            transformOrigin: 'center left',
          },
          '&:hover:after': {
            boxShadow: theme.shadows[2],
            outline: `1px solid ${red}`,
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
        },
        // [theme.breakpoints.up('xl')]: {
        //   width: `${float ? '40%' : '65%'} !important`,
        // },
        [theme.breakpoints.up('md')]: {
          margin: `${theme.spacing(2)}px auto`,
          // width: float ? '45%' : '50%',
          float: float || 'none ',
          background: 'transparent',
          position: 'relative',
          '& figcaption': {
            minWidth: '35%',
            overflow: 'hidden',
            transition: 'all 250ms ease',
            '&:after': {
              transform: 'translateX(-100%)',
              content: '""',
              position: 'absolute',
              top: 0,
              right: theme.spacing(4),
              bottom: 0,
              left: '-50%',
              transition: 'all 250ms ease',
            },
          },
          '& div img': {
                            transition: `all 400ms ease-in-out !important`,
          },
          '@media (hover:hover)': {
            '&:hover div': {
              overflow: 'hidden',
              '& img': {
                transform: 'scale(1.025)',
                // transition: `all 400ms ease-in-out !important`,
              },
            },

            '&:hover figcaption': {
              // outline: `${theme.spacing(0.2)}px solid ${red}`,

              // justifyContent: 'center',
              color: theme.palette.background.default,

              '&:after': {
                transition: 'all 250ms ease',
                transform: 'translateX(0) skew(-45deg) ',
                borderRight: `${theme.spacing(2)}px solid ${
                  theme.palette.secondary.main
                }`,
                zIndex: -10,
                background: fade(theme.palette.primary.main, 0.7),
              },
            },
          },
        },

        //   '& div img': {
        //             // wip need to tweak
        //       transition: `transform 400ms ease-in-out !important`,
        // },import { display } from '@material-ui/system';
      },

      caption: {
        transition: 'all 50ms ease',
        display: 'inline-flex',
        zIndex: 5,
        position: 'relative',
        padding: theme.spacing(1, 8, 1, 1),
      },
      captionText: {},
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


  const { fluid, aspectRatio } = getImageInfo({ _ref });

  const modalUpdater = useContext( ModalUpdater );

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
    } );
  
  return (
    <ContainedDiv aspectRatio={aspectRatio} height={.85}>
      <Box component="figure" onClick={openHandler} className={classes.root}>
        <Img fluid={fluid} alt={node.alt} />
        {node.caption && (
          <Box component="figcaption" className={classes.caption}>
            <Typography variant="h5" className={classes.captionText}>
              {node.caption}
            </Typography>
          </Box>
        )}
      </Box>
    </ContainedDiv>
  );
};

// const query = graphql`
//   query BlockImageQuery {
//     assets: allSanityImageAsset {
//       edges {
//         node {
//           _id
//           metadata {
//             dimensions {
//               aspectRatio
//             }
//           }
//           localFile(width: 2400) {
//             childImageSharp {
//               fluid(
//                 maxWidth: 2400
//                 traceSVG: { color: "#8b151b77", background: "#ffd83111" }
//               ) {
//                 ...GatsbyImageSharpFluid_withWebp_tracedSVG
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
