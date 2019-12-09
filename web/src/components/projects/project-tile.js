import React from 'react';
import Img from 'gatsby-image';
import {
  Container,
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
  return {
    root: {
      cursor: 'pointer',
      marginBottom: gap,
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
        background: lighten(theme.palette.secondary.light, 0.35),
        borderBottom: `${theme.spacing(0.35)}px solid ${red}`,
        borderRight: `${theme.spacing(0.25)}px solid ${red}`,
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
    </Paper>
  );
};

export default ProjectTile;
