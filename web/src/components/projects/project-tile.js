import React from 'react';
import Img from 'gatsby-image';
import { navigate } from 'gatsby';
import {
  Container,
  Button,
  Typography,
  Paper,
  makeStyles,
  Box,
  Hidden,
  fade,
  lighten,
  darken,
} from '@material-ui/core';
import BlockContent from '../block-content';

const useStyles = makeStyles(theme => {
  const gap = theme.spacing(2);
  const red = lighten(theme.palette.primary.dark, 0.25);
  const darkYellow = theme.palette.secondary.main;
  return {
    root: {
      cursor: 'pointer',
      position: 'relative',
      marginBottom: gap,
      // background: theme.palette.background.default,
      '&:hover': {
        boxShadow: theme.shadows[2],
      },
    },
    drawerWrapper: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      '&:hover div': {
        transform: `rotate(0) translateY(0)`,
      },
      '&:hover h6': {
        transform: `rotate(-90deg) translateY(150%)`,
      },
    },
    overlay: {
      transformOrigin: 'top right',
      transition: 'all 150ms cubic-bezier(0.895, 0.030, 0.685, 0.220)',
      transform:  `rotate(0) translateY(0)`,
      boxShadow: theme.shadows[2],
      background: theme.palette.primary.light,
      minWidth: '25%',
      display: 'flex',
      justifyContent: 'center',
      color: theme.palette.background.default,
      padding: theme.spacing(0.25, 2),
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    infoWrapper: {
      transformOrigin: 'top left',
      transition: 'all 150ms cubic-bezier(0.895, 0.030, 0.685, 0.220)',
      transform: `rotate(90deg) translateY(150%)`,
      position: 'absolute',
      bottom: 0,
      zIndex: 50,
      left: 0,
      right: 0,
      borderTop: `${theme.spacing(0.15)}px solid ${red}`,
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
    excerptWrapper: {
      padding: theme.spacing(0.5, 1, 0, 1),
    },
    headingWrap: {
      overflow: 'hidden',
    },
    heading: {
      position: 'relative',
      minWidth: '50%',
      display: 'inline-block',
      // color: theme.palette.text,
      padding: theme.spacing(0.5, 4, 0.5, 1),
      // background: lighten(theme.palette.primary.main, 0.35),
      '&::after': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: '-50%',
        right: 0,
        bottom: 0,
        transform: 'skew(-45deg)',
        background: lighten(theme.palette.secondary.light, 0.75),
        borderBottom: `${theme.spacing(0.35)}px solid ${red}`,
        borderRight: `${theme.spacing(0.25)}px solid ${red}`,
      },
    },
    actionWrapper: {
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    action: {
      color: theme.palette.background.default,
      borderRadius: 0,
      '&:hover': {
        background: 'inherit',
        '&::after': {
          background: darken(red, 0.3),
          borderTop: `${theme.spacing(0.35)}px solid ${darken(
            darkYellow,
            0.15,
          )}`,
          borderLeft: `${theme.spacing(0.25)}px solid ${darken(
            darkYellow,
            0.15,
          )}`,
        },
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        right: '-50%',
        left: theme.spacing(-2),
        bottom: 0,
        transform: 'skew(-45deg)',
        background: red,
        borderTop: `${theme.spacing(0.35)}px solid ${darkYellow}`,
        borderLeft: `${theme.spacing(0.25)}px solid ${darkYellow}`,
      },
    },
  };
});

const ProjectTile = ({
  title,
  excerpt,
  slug: { current: slug },
  mainImage: {
    caption,
    alt,
    asset: {
      localFile: {
        childImageSharp: { fluid },
      },
    },
  },
  forwardedBreadcrumb = null,
  openHandler = null,
  ...props
}) => {
  const classes = useStyles(props);
  const handleNavigate = () => navigate(`/portfolio/${slug}/`,forwardedBreadcrumb ? {state: {forwardedBreadcrumb}}: {});
  const handleClick = () => openHandler ? openHandler({title, excerpt, slug, fluid}) : handleNavigate()
  return (
    <Paper
      square
      className={classes.root}
      elevation={0}
      onClick={handleClick}
    >
      <Img fluid={fluid} fadeIn durationFadeIn={1500} />
      <Box className={classes.drawerWrapper}>
        <Typography variant="h6" className={classes.overlay}>
          {title}
        </Typography>
        <Box className={classes.infoWrapper}>
          <Box className={classes.headingWrap}>
            <Typography variant="h5" className={classes.heading}>
              {title}
            </Typography>
          </Box>
          <Box className={classes.excerptWrapper}>
            <BlockContent blocks={excerpt} />
          </Box>
          <Box className={classes.actionWrapper}>
            <Button disableFocusRipple disableRipple className={classes.action}>
              Open
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProjectTile;
