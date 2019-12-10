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

const useStyles = portrait =>
  makeStyles(theme => ({
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

const useProjectPreviewModal = props => {
  const [modalData, setModalData] = useState({});

  const openHandler = ({
    title,
    excerpt,
    slug,
    fluid,
    aspectRatio,
    handleNavigate,
  }) =>
    setModalData({ title, excerpt, slug, fluid, aspectRatio, handleNavigate });
  const closeHandler = () => setModalData({});
  const theme = useTheme();
  const {
    // @ts-ignore
    title,
    // @ts-ignore
    excerpt,
    // @ts-ignore
    fluid,
    // @ts-ignore
    aspectRatio,
    // @ts-ignore
    handleNavigate,
  } = modalData;

  const [
    { screenAspect, windowWidth, windowHeight, updated },
    setScreenAspect,
  ] = useState({
    updated: false,
    windowWidth: 1080,
    windowHeight: 1920,
    screenAspect: 1980 / 1080,
  });

  const portrait = screenAspect < aspectRatio;

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

  const classes = useStyles(portrait)(props);
  const spacing = theme.spacing(2);
  const open = Object.entries(modalData).length !== 0;
  const previewModal = (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={closeHandler}
      className={classes.root}
    >
      <>
        <Typography variant="h3" className={classes.title}>
          {title}
        </Typography>
        <Button className={classes.closeButton}>
          <CloseOutlined titleAccess="Close Modal" fontSize="large" />
        </Button>
        <Zoom in={open}>
          <Paper
            square
            onClick={handleNavigate}
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
        <Button
          onClick={handleNavigate}
          variant="contained"
          size="large"
          color="primary"
          className={classes.viewButton}
        >
          Open Project
        </Button>
      </>
    </Modal>
  );
  return { openHandler, previewModal };
};

export default useProjectPreviewModal;
