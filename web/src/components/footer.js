import React from 'react';
import Img from 'gatsby-image';
import {
  AppBar,
  Typography,
  Box,
  makeStyles,
  fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import BlockContent from './block-content';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // background: fade(theme.palette.secondary.dark, 0.35),
    background: 'transparent',
    [ theme.breakpoints.down( 'sm' ) ]: {
        background: fade(theme.palette.secondary.dark,.25)
       },
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
    [ theme.breakpoints.down( 'md' ) ]: {
      width: '200%'
    },
    [ theme.breakpoints.down( 'sm' ) ]: {
          width: '400%'
        },
    position: 'relative',
    display: 'flex',
    textAlign: 'right',
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
  socialIcon: {
    width: theme.typography.fontSize * 1.5,
    height: theme.typography.fontSize * 1.5,
    marginRight: theme.typography.fontSize,
  },
  linkItem: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  linkText: {
    flexGrow: 0,
  },
}));

const Footer = ({ siteTitle, siteFooter, siteLinks, ...props }) => {
  const classes = useStyles(props);

  return (
    <AppBar
      square
      position="static"
      component="footer"
      elevation={0}
      className={classes.root}
    >
      <Box className={classes.leftBox} />
      <Box className={classes.rightBox}>
        <Typography variant="h6" style={{ fontVariant: 'small-caps' }}>
          {siteTitle}
        </Typography>

        <BlockContent blocks={siteFooter} />
        <List dense style={{ marginLeft: 'auto' }}>
          {siteLinks.map(({ linkTitle, linkUrl, fluid }) => {
            return (
              <ListItem
                component="a"
                button
                href={linkUrl}
                target="_blank"
                className={classes.linkItem}
              >
                {/* <ListItemIcon> */}
                <Box className={classes.socialIcon}>
                  <Img fluid={fluid} />
                </Box>
                {/* </ListItemIcon> */}
                <ListItemText className={classes.linkText}>
                  {linkTitle}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </AppBar>
  );
};

export default Footer;
