import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image';
import {
  makeStyles,
  Modal,
  Backdrop,
  Paper,
  Fade,
  Button,
} from '@material-ui/core';

const useStyles = portrait =>
  makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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

  const {
    title,
    excerpt,
    slug,
    fluid,
    aspectRatio,
    handleNavigate,
  } = modalData;

  const [
    { screenAspect, windowWidth, windowHeight },
    setScreenAspect,
  ] = useState({
    windowWidth: window.innerWidth || 1080,
    windowHeight: window.innerHeight || 1920,
    screenAspect: 1980 / 1080,
  });

  const portrait = screenAspect < aspectRatio;

  const updateScreen = () =>
    setScreenAspect({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      screenAspect: window.innerWidth / window.innerHeight,
    });

  useEffect(() => {
    window.addEventListener('resize', updateScreen);
    return () => {
      window.removeEventListener('resize', updateScreen);
    };
  }, [updateScreen]);

  const classes = useStyles(portrait)(props);

  const previewModal = (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={Object.entries(modalData).length !== 0}
      onClose={closeHandler}
      className={classes.root}
    >
      <Paper
        square
        onClick={handleNavigate}
        style={{
          height: portrait ? (windowWidth - 5) / aspectRatio : windowHeight - 5,
          width: portrait ? windowWidth - 5 : (windowHeight - 5) * aspectRatio,
          overflow: 'hidden',
        }}
      >
        <Img fluid={fluid} />
      </Paper>
    </Modal>
  );
  return { openHandler, previewModal };
};

export default useProjectPreviewModal;
