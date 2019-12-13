import React,{useContext} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image'
import {
  makeStyles,
  Box,
  Paper,
  lighten,
  darken,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  ListSubheader,
  useMediaQuery,
} from '@material-ui/core';

// import { ModalUpdater } from './layout';
// import FigureModal from './figure/figure'

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'inline-flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2, 0),
      },
    },
    name: {
      padding: theme.spacing( 2 ),
      [ theme.breakpoints.down( 'sm' ) ]: {
         textAlign: 'center'
       }
    },
    imageWrap: {
      boxShadow: theme.shadows[2],
      [ theme.breakpoints.down( 'md' ) ]: {
      width: '20vh',
      height: '20vh',
      },
            [ theme.breakpoints.down( 'sm' ) ]: {
      width: '30vh',
      height: '30vh',
      },
            [ theme.breakpoints.down( 'xs' ) ]: {
      width: '60vw',
      height: '60vw',
      },
      width: '25vh',
      height: '25vh',
      borderRadius: 10000,
      overflow: 'hidden',
      margin: theme.spacing(4),
    }
  };
});

const AvatarHeading = ({ ...props }) => {
  const {
    site: {
      title,
      subtitle,
      profileImage: {
        asset: {
          metadata: {
            dimensions: {
              aspectRatio
            }
          },
          localFile: {
            childImageSharp: {
              fluid
            }
          }
        }
      }
    },
  } = useStaticQuery(query);
  const classes = useStyles( props );
  //   const modalUpdater = useContext(ModalUpdater);

  // const openHandler = () => {
  //   modalUpdater( {
  //     closeHandler: handleClose && handleClose,
  //     children: (
  //       <FigureModal
  //         {...{
  //           fluid,
  //           aspectRatio
  //         }}
  //       />
  //     ),
  //   })};
  
  
  const isPhone = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery( theme => theme.breakpoints.down( 'sm' ) );
  
  return (
    <Box className={classes.root}>
      <Box className={ classes.imageWrap }
        // onClick={ openHandler }
      >
         <Img fluid={ fluid } />
      </Box>
      <Box>
        <Typography variant={isPhone ? "h1" : isTablet ? "h2" : "h3"} className={classes.name}>
          {title}
        </Typography>
        <Typography variant={isPhone ? "h3" : isTablet ? "h4" : "h5"} className={classes.name}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

const query = graphql`
  query AvatarHeadingQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      subtitle
            profileImage {
        asset {
                    metadata {
            dimensions {
              aspectRatio
            }
          }
          localFile(width: 24) {
            childImageSharp {
              fluid(
                maxWidth: 24
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
export default AvatarHeading;