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
  return {
    root: {
      cursor: 'pointer',
      marginBottom: gap,
      '&:hover': {
        background: fade(theme.palette.secondary.light, 0.15),
        boxShadow: theme.shadows[2],
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
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h6">{slug}</Typography>
      <BlockContent blocks={excerpt} />
    </Paper>
  );
};

export default ProjectTile;
