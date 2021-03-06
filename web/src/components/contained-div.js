import React, { useState, useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import useResizeAware from 'react-resize-aware';

const useStyles = forSlider =>
  makeStyles(theme => ({
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      scrollSnapAlign: 'start',
      margin: `${theme.spacing(2)}px ${
        forSlider ? `${theme.spacing(1)}px` : `auto`
      }`,
      [theme.breakpoints.up('sm')]: {
        // height: '75vh',
        // overflow: 'hidden'
      },
    },
  }));

// Div that takes up whole height

const ContainedDiv = ({
  aspectRatio = 1,
  height = 0.75,
  forSlider = false,
  ref = null,
  children,
  ...props
}) => {
  const classes = useStyles(forSlider)(props);
  const [resizeListener, { width: divWidth }] = useResizeAware();
  const [{ updated, divHeight }, setDivHeight] = useState({
    updated: false,
    divHeight: 1080,
  });
  const divAspect = divWidth / divHeight;
  const constrainWidth = divAspect > aspectRatio;

  const updateHeight = () =>
    setDivHeight({ updated: true, divHeight: window.innerHeight * height });
  useEffect(() => {
    if (!updated) updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [updateHeight]);

  return (
    <Box className={classes.root} {...props} ref={ref}>
      {resizeListener}
      <Box
        style={{
          width: constrainWidth || forSlider ? divHeight * aspectRatio : '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ContainedDiv;
