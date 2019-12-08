import React from 'react';
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
import Masonry from 'react-masonry-css';

import ProjectTile from './project-tile';

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'flex',
    marginLeft: -30,
    width: 'auto',
  },
  column: {
    paddingLeft: 30,
    backgroundClip: 'padding-box',
  },
}));

const ProjectGrid = ({ projects, ...props }) => {
  const classes = useStyles(props);
  return (
    <Box>
      <Masonry
        breakpointCols={4}
        className={classes.grid}
        columnClassName={classes.column}
      >
        {[...projects, ...projects, ...projects, ...projects, ...projects].map(
          ProjectTile,
        )}
      </Masonry>
    </Box>
  );
};

export default ProjectGrid;
