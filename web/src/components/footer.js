import React from 'react';
import {
  AppBar,
  Container,
  Paper,
  Collapse,
  Typography,
  TextField,
  Zoom,
  Fade,
  Grow,
  Slide,
  Breadcrumbs,
  Box,
  Button,
  makeStyles,
  fade,
  Hidden,
} from '@material-ui/core';
import { display } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // background: fade(theme.palette.secondary.dark, 0.35),
    background: 'transparent',
    overflow: 'hidden',
    borderBottom: `${fade(
      theme.palette.primary.dark,
      0.75,
    )} solid ${theme.spacing(1)}px`,
  },
  leftBox: {
    [theme.breakpoints.up('md')]: {
      width: '150%',
      position: 'relative',
      // background: 'blue',
      '&::before': {
        content: '""',
        zIndex: -1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: '-50%',
        transform: 'skewX(-45deg)',
        clipPath: 'polygon(90% 100%, 100% 0, 100% 100%, 0% 100%)',
        background: fade(theme.palette.secondary.dark, 0.5),
      },
      '&::after': {
        content: '""',
        zIndex: -1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: '-50%',
        transform: 'skewX(-45deg)',
        clipPath: 'polygon(75% 60%, 100% 0, 90% 100%, 0 100%, 0 60%)',
        background: fade(theme.palette.secondary.light, 0.5),
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '25%',
      position: 'relative',
      '&::before': {
        content: '""',
        zIndex: -1,
        position: 'absolute',
        top: 0,
        right: theme.spacing(0.75),
        bottom: '-10%',
        left: '-100%',
        transform: 'skewX(-45deg)',
        clipPath: `polygon(100% 0, 0% 100%, 100% 100%)`,
        background: fade(theme.palette.secondary.dark, 0.25),
      },
    },
  },

  rightBox: {
    width: '75%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    '&::before': {
      content: '""',
      zIndex: -1,
      borderTop: `${fade(
        theme.palette.primary.dark,
        0.5,
      )} solid ${theme.spacing(0.75)}px`,
      // borderLeft: `${fade(
      //   theme.palette.primary.dark,
      //   0.5,
      // )} solid ${theme.spacing(0.25)}px`,
      position: 'absolute',
      top: 0,
      right: '-50%',
      bottom: 0,
      left: 0,
      transform: 'skewX(-45deg)',
      background: fade(theme.palette.primary.dark, 0.6),
    },
  },
}));

const Footer = ({ ...props }) => {
  const classes = useStyles(props);
  return (
    <AppBar
      square
      position="static"
      component="footer"
      elevation={0}
      className={classes.root}
    >
      <Box className={classes.leftBox}></Box>
      <Box className={classes.rightBox}>
        <Typography variant="h6" align="right">
          Felipe Flores Comics
        </Typography>
        <Typography variant="body1" align="right">
          Phone: ###-###-####
          <br />
          Email: name@address.com
          <br />
          mail: 123 main st, city, state 12345
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Footer;
