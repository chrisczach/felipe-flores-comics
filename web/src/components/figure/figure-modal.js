import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image';
import {
  useTheme,
  makeStyles,
  Modal,
  Backdrop,
  Typography,
  Paper,
  Fade,
  Button,
  Zoom,
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: `blur(4px) brightness(1.25) saturate(0.75)`,
  },
  title: {
    zIndex: 1000,
    background: theme.palette.primary.dark,
    color: theme.palette.background.default,
    borderRadius: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    padding: theme.spacing(1, 4, 1, 2),
  },
  viewButton: {
    borderRadius: 0,
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
  closeButton: {
    opacity: 0.9,
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1000,
  },
}));

const FigureModal = ({ open, fluid, aspectRatio, closeHandler, ...props }) => {
  const classes = useStyles(props);
  const [
    { screenAspect, windowWidth, windowHeight, updated },
    setScreenAspect,
  ] = useState({
    updated: false,
    windowWidth: 1080,
    windowHeight: 1920,
    screenAspect: 1980 / 1080,
  });

  const updateScreen = () =>
    setScreenAspect({
      updated: true,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      screenAspect: window.innerWidth / window.innerHeight,
    });

  useEffect(() => {
    if (!updated) {
      updateScreen();
    }
    window.addEventListener('resize', updateScreen);
    return () => {
      window.removeEventListener('resize', updateScreen);
    };
  }, [updateScreen]);
  const theme = useTheme();
  const spacing = theme.spacing(2);
  const portrait = screenAspect < aspectRatio;
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={closeHandler}
      className={classes.root}
    >
      <>
        <Button className={classes.closeButton} onClick={closeHandler}>
          <CloseOutlined titleAccess="Close Modal" fontSize="large" />
        </Button>
        <Zoom in={open}>
          <Paper
            onClick={closeHandler}
            square
            style={{
              height: portrait
                ? (windowWidth - spacing) / aspectRatio
                : windowHeight - spacing,
              width: portrait
                ? windowWidth - spacing
                : (windowHeight - spacing) * aspectRatio,
              overflow: 'hidden',
            }}
          >
            <Img fluid={fluid} />
          </Paper>
        </Zoom>
      </>
    </Modal>
  );
};

export default FigureModal;
