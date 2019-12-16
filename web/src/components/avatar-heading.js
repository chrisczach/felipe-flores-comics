import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
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
  Grow,
} from '@material-ui/core';
import { useInView } from 'react-intersection-observer';

// import { ModalUpdater } from './layout';
// import FigureModal from './figure/figure'

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2, 0),
      },
    },
    name: {
      color: darken(theme.palette.secondary.dark, 0.2),
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    subtitle: {
      // color: theme.palette.primary.light,
      padding: theme.spacing(2),
      opacity: 0.9,
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        padding: theme.spacing(2, 2, 4, 2),
      },
    },
    imageWrap: {
      boxShadow: theme.shadows[5],
      borderRadius: `${theme.spacing(8)}px ${theme.spacing(1)}px`,
      [theme.breakpoints.down('md')]: {
        width: '20vh',
        height: '20vh',
      },
      [theme.breakpoints.down('sm')]: {
        width: '30vh',
        height: '30vh',
      },
      [theme.breakpoints.down('xs')]: {
        width: '60vw',
        height: '60vw',
      },
      width: '25vh',
      height: '25vh',
      overflow: 'hidden',
      margin: theme.spacing(4),
    },
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
            dimensions: { aspectRatio },
          },
          localFile: {
            childImageSharp: { fluid },
          },
        },
      },
    },
  } = useStaticQuery(query);
  const classes = useStyles(props);

  const isPhone = useMediaQuery(theme => theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [ref, inView, entry] = useInView({ threshold: 0.1 });

  return (
    <div ref={ref}>
      <Grow in={inView} timeout={1000}>
        <Box className={classes.root}>
          <Box
            className={classes.imageWrap}
            // onClick={ openHandler }
          >
            <Img fluid={fluid} />
          </Box>
          <Box>
            <Typography
              variant={isPhone ? 'h1' : isTablet ? 'h2' : 'h3'}
              className={classes.name}
            >
              {title}
            </Typography>
            <Typography
              variant={isPhone ? 'h3' : isTablet ? 'h4' : 'h5'}
              className={classes.subtitle}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </Grow>
    </div>
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
          localFile(width: 1200) {
            childImageSharp {
              fluid(
                maxWidth: 1200
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
