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
import useProjectPreviewModal from './use-project-preview-modal';

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

const ProjectGrid = ({
  projects,
  forwardedBreadcrumb = null,
  enablePreview = false,
  ...props
}) => {
  // @ts-ignore
  const sm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  // @ts-ignore
  const md = useMediaQuery(theme => theme.breakpoints.down('md'));

  const columns = sm ? 1 : md ? 2 : 3;
  const classes = useStyles(props);
  const { openHandler, previewModal } = useProjectPreviewModal();

  return (
    <>
      {enablePreview && previewModal}
      <Box>
        <Masonry
          breakpointCols={columns}
          className={classes.grid}
          columnClassName={classes.column}
        >
          {[...projects, ...projects, ...projects].map(props => (
            <ProjectTile
              {...props}
              forwardedBreadcrumb={forwardedBreadcrumb}
              openHandler={enablePreview && openHandler}
            />
          ))}
        </Masonry>
      </Box>
    </>
  );
};

export default ProjectGrid;
