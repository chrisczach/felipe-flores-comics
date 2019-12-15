import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles, fade } from '@material-ui/core/styles';
import {
  Drawer,
  Button,
  List,
  ListItemIcon,
  ListItemText,
  Slide,
  ListItem,
  Box,
  lighten,
} from '@material-ui/core';
import {
  HomeOutlined,
  InfoOutlined,
  PhotoAlbumOutlined,
  ContactMailOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => {
  const backgroundColor = fade(theme.palette.secondary.light, 0.25);
  const buttonColor = fade(theme.palette.background.default, 0.75);
  const accent = lighten(theme.palette.primary.main, 0.25);
  return {
    menuButton: {
      borderRadius: 0,
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
      background: `linear-gradient(45deg, transparent 15%, ${buttonColor} 15%)`,
      '&:hover': {
        background: `linear-gradient(45deg, transparent 15%, ${theme.palette.background.default} 15%)`,
      },
    },
    menuButtonClosed: {
      borderRadius: 0,
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
      color: theme.palette.background.default,
      background: `linear-gradient(45deg, transparent 15%, ${theme.palette.primary.dark} 15%)`,
      '&:hover': {
        background: `linear-gradient(45deg, transparent 15%, ${theme.palette.primary.main} 15%)`,
      },
    },
    menuBar: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: theme.spacing(8, 8, 2, 4),
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // WIP MAYBE
      transform: `skewX(15deg) !important`,
      alignItems: 'stretch',
      '&::before': {
        // transform: `skewX(15deg) translateX(${theme.spacing(4)}px)`,
        // transform: `translateX(${theme.spacing(4)}px) `,
        transformOrigin: '0 0',
        content: '""',
        top: 0,
        right: theme.spacing(-8),
        bottom: 0,
        left: theme.spacing(4),
        position: 'absolute',
        backgroundImage: `radial-gradient(${lighten(
          theme.palette.primary.light,
          0.7,
        )} 10%, transparent 10%), radial-gradient(${lighten(
          theme.palette.primary.light,
          0.8,
        )} 10%, transparent 10%)`,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        backgroundPosition: `0 0, 5px 5px`,
        backgroundSize: `10px 10px`,
      },
    },
    menuHeading: {
      margin: theme.spacing(0, 0, 2, 0),
      position: 'relative',
      transform: `translateX(${theme.spacing(-0.5)}px) skewX(-15deg)`,
      border: `${theme.spacing(0.5)}px solid ${accent}`,
      backgroundImage: `radial-gradient(${lighten(
        theme.palette.primary.light,
        0.45,
      )} 10%, transparent 10%), radial-gradient(${lighten(
        theme.palette.primary.light,
        0.55,
      )} 10%, transparent 10%)`,
      backgroundColor: theme.palette.secondary.light,
      backgroundPosition: `0 0, 5px 5px`,
      backgroundSize: `10px 10px`,
      '&::before': {
        content: '""',
        top: theme.spacing(0.5),
        right: theme.spacing(-1.25),
        bottom: theme.spacing(-1.25),
        left: theme.spacing(0.5),
        position: 'absolute',
        background: 'transparent',
        borderRight: `${theme.spacing(1)}px solid ${accent}`,
        borderBottom: `${theme.spacing(1)}px solid ${accent}`,
      },
    },
    navTitle: {
      margin: theme.spacing(1, 2),
    },
    menuPaper: {},

    listItemClass: {
      width: 'auto',
      transform: `skewX(-15deg)`,
      background: theme.palette.primary.light,
      margin: theme.spacing(1, 0),
      // background: 'transparent',
    },
  };
});

const actions = [
  { icon: <HomeOutlined />, name: 'Home', slug: '/' },
  { icon: <InfoOutlined />, name: 'About', slug: 'about/' },
  { icon: <PhotoAlbumOutlined />, name: 'Portfolio', slug: 'portfolio/' },
  { icon: <ContactMailOutlined />, name: 'Contact', slug: 'contact/' },
];

const toNav = (handleClose, listItemClass) => ({ name, icon, slug }, index) => {
  const handleClick = () => {
    handleClose();
    navigate(slug);
  };
  return (
    // <Link to={slug}>
    <Slide in direction="left" timeout={index * 250 + 500}>
      <Box>
        <ListItem
          button
          key={name}
          onClick={handleClick}
          className={listItemClass}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </Box>
    </Slide>
    // </Link>
  );
};

const Nav = ({ siteTitle, siteSubtitle, ...props }) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(open => !open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {!open && (
        <Button onClick={handleToggle} className={classes.menuButton}>
          <MenuOutlined titleAccess="Open Nav Menu" fontSize="large" />
        </Button>
      )}
      <Drawer
        SlideProps={{ timeout: 500 }}
        ModalProps={{
          BackdropProps: {
            style: {
              backdropFilter: 'blur(4px)',
              background: 'rgba(50,50,50,.25)',
            },
          },
        }}
        PaperProps={{
          className: classes.menuPaper,
          elevation: 0,
        }}
        // disableBackdropTransition={!iOS}
        // disableDiscovery={iOS}
        open={open}
        // onOpen={handleOpen}
        onClose={handleClose}
        anchor="right"
      >
        <Button onClick={handleToggle} className={classes.menuButtonClosed}>
          <CloseOutlined titleAccess="Close Nav Menu" fontSize="large" />
        </Button>
        <Slide in direction="down" timeout={500}>
          <List disablePadding className={classes.menuBar}>
            <ListItem key={siteTitle} className={classes.menuHeading}>
              <ListItemText
                primary={siteTitle}
                primaryTypographyProps={{
                  style: {
                    fontWeight: 'bold',
                    fontVariant: 'small-caps',
                  },
                  color: 'primary',
                  variant: 'h5',
                }}
                secondary={siteSubtitle}
                secondaryTypographyProps={{
                  color: 'textPrimary',
                  style: {
                    marginBottom: 0,
                  },
                }}
                className={classes.navTitle}
                style={{ opacity: 0.75 }}
              />
            </ListItem>
            {actions.map(toNav(handleClose, classes.listItemClass))}
          </List>
        </Slide>
      </Drawer>
    </>
  );
};

export default Nav;
