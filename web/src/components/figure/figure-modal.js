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


const FigureModal = ({ fluid, aspectRatio, closeHandler, ...props }) => {
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
      <>
        <Zoom in>
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
  );
};

export default FigureModal;
