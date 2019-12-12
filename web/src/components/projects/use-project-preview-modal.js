import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image';
import {
  useTheme,
  makeStyles,
  Modal,
  Backdrop,
  Box,
  Typography,
  Paper,
  Fade,
  darken,
  lighten,
  Button,
  fade,
  Zoom,
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';

const useStyles = portrait =>
  makeStyles( theme => {
        const backgroundColor = lighten(theme.palette.secondary.light, 0.5)
    const darkYellow = theme.palette.secondary.main;
    const red = lighten( theme.palette.primary.dark, 0.25 );
    
    return ( {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: `blur(4px) brightness(1.25) saturate(0.75)`,
    },
    title: {
      zIndex: 1000,
      color: theme.palette.background.default,
      borderRadius: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      padding: theme.spacing(0.5, 1, 0.5, 1),
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
    titleRoot: {
        zIndex: 5000,
        pointerEvents: 'none',
        position: 'fixed',
      top: 0,
        left: 0,
        background: 'transparent',
        display: 'flex',
        flexDirection: 'row',
      },
      titleWrap: {
        position: 'relative',
        background: 'transparent',
        padding: theme.spacing(1, 3, 1, 1),
        zIndex: 50,
        '&::before': {
          backdropFilter: `blur(10px)`,
          borderRight: `${lighten(
            theme.palette.primary.dark,
            0.25,
          )} solid ${theme.spacing(2)}px`,
          borderBottom: `${lighten(
            theme.palette.primary.light,
            0.25,
          )} solid ${theme.spacing(0.25)}px`,
          content: '""',
          zIndex: -1,
          position: 'absolute',
          top: 0,
          right: theme.spacing(-4),
          bottom: 0,
          left: theme.spacing(-6),
          transform: 'skewX(-45deg)',
          background: backgroundColor,
        },
      },
      titleHeading: {
        fontVariant: 'small-caps',
        fontWeight: 'bold',
        opacity: 0.65,
      },
      titleSubHeading: {
        opacity: 0.75,
        marginBottom: 0,
      },
      actionWrapper: {
      display: 'flex',
        justifyContent: 'flex-end',
        position: 'fixed',
        bottom: 0,
        right: 0,
      zIndex: 5000,
    },
      action: {
      color: theme.palette.background.default,
      borderRadius: 0,

          background: 'inherit',
          '&::after': {
            background: darken(red, 0.3),
            borderTop: `${theme.spacing(0.35)}px solid ${darken(
              darkYellow,
              0.15,
            )}`,
            borderLeft: `${theme.spacing(0.25)}px solid ${darken(
              darkYellow,
              0.15,
            )}`,
          },

      '&::after': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        right: '-50%',
        left: theme.spacing(-2),
        bottom: 0,
        transform: 'skew(-45deg)',
        background: red,
        borderTop: `${theme.spacing(0.35)}px solid ${darkYellow}`,
        borderLeft: `${theme.spacing(0.25)}px solid ${darkYellow}`,
      },
      },
      open: {
        padding: theme.spacing(0.5,3,0,6)
      }
  
  })});

const useProjectPreviewModal = ({forwardedBreadcrumb = null,...props}) => {
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
        {/* <Box className={classes.title}>
        {forwardedBreadcrumb && <Typography variant="h5" >
          {forwardedBreadcrumb.title}
          </Typography>}
                  <Typography variant="h6">
          {title}
          </Typography>
          </Box> */}
        {title && <Paper square elevation={0} className={classes.titleRoot}>
            <Box className={classes.titleWrap}>
              <Typography
                variant="h5"
                color="primary"
                className={classes.titleHeading}
              >
                {forwardedBreadcrumb.title}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className={classes.titleSubHeading}
              >
                {title}
              </Typography>
            </Box>
          </Paper>}
        <Button className={classes.closeButton} onClick={closeHandler}>
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
        {/* <Button
          onClick={handleNavigate}
          variant="contained"
          size="large"
          color="primary"
          className={classes.viewButton}
        >
          Open Project
        </Button> */}
         <Box className={classes.actionWrapper}>
          <Button disableFocusRipple disableRipple className={ classes.action } onClick={ handleNavigate }>
            <Typography variant='h6' className={classes.open }>
              Open Project
              </Typography>
            </Button>
          </Box>
      </>
    </Modal>
  );
  return { openHandler, previewModal };
};

export default useProjectPreviewModal;
