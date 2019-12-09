import React from 'react';
import Img from 'gatsby-image';
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
} from '@material-ui/core';
import BlockContent from '../block-content';

const useStyles = makeStyles(theme => {
  const gap = theme.spacing(2);
  const red = lighten(theme.palette.primary.dark, 0.25);
  const darkYellow = theme.palette.secondary.main;
  return {
    root: {
      // cursor: 'pointer',
      marginBottom: gap,
      background: theme.palette.background.default,
      '&:hover': {
        background: fade(theme.palette.secondary.light, 0.15),
        boxShadow: theme.shadows[2],
      },
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
  ...props
}) => {
  const classes = useStyles(props);
  return (
    <Paper square className={classes.root} elevation={0}>
      <Img fluid={fluid} fadeIn durationFadeIn={1500} />
      <Box className={classes.headingWrap}>
        <Typography variant="h5" className={classes.heading}>
          {title}
        </Typography>
      </Box>

      <Typography variant="h6">{slug}</Typography>
      <BlockContent blocks={excerpt} />
      <Box className={classes.actionWrapper}>
        <Button disableFocusRipple className={classes.action}>
          Action Button
        </Button>
      </Box>
    </Paper>
  );
};

export default ProjectTile;
