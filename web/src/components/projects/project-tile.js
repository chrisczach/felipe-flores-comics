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
}) => {
  return (
    <div>
      <Img fluid={fluid} />
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h6">{slug}</Typography>
      <BlockContent blocks={excerpt} />
    </div>
  );
};

export default ProjectTile;
