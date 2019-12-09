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
  useMediaQuery,
} from '@material-ui/core';
import Masonry from 'react-masonry-css';

import ProjectTile from './project-tile';

const useStyles = makeStyles(theme => {
  const gap = theme.spacing(2);
  return {
    grid: {
      display: 'flex',
      marginLeft: -gap,
      width: 'auto',
    },
    column: {
      paddingLeft: gap,
      backgroundClip: 'padding-box',
    },
  };
});

const ProjectGrid = ({ projects, ...props }) => {
  // @ts-ignore
  const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  // @ts-ignore
  const md = useMediaQuery(theme => theme.breakpoints.down('md'));

  const columns = sm ? 1 : md ? 2 : 3;
  const classes = useStyles(props);
  return (
    <Box>
      <Masonry
        breakpointCols={columns}
        className={classes.grid}
        columnClassName={classes.column}
      >
        {[...projects, ...projects, ...projects].map(
          ProjectTile,
        )}
      </Masonry>
    </Box>
  );
};

export default ProjectGrid;
