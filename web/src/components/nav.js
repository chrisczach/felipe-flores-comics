import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles, fade } from '@material-ui/core/styles';
import {
  SwipeableDrawer,
  Button,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
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
  return {
    menuButton: {
      position: 'fixed',
      top: theme.spacing(1),
      right: theme.spacing(1),
      zIndex: 1000,
    },
    menuHeading: {
      background: backgroundColor,
      '&:before': {
        content: `""`,
        position: 'absolute',
        background: backgroundColor,
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // transform: 'skewY(2deg)',
        // borderBottom: `${theme.spacing(1)}px solid ${
        //   theme.palette.primary.main
        // }`,
      },
    },
    menuPaper: {
      background: 'transparent',
    },
    menuBar: {
      background: theme.palette.background.default,
      height: 'auto',
      display: 'inline-flex',
      flexDirection: 'column',
      top: theme.spacing(8),
      paddingBottom: theme.spacing(1),
      position: 'absolute',
      right: theme.spacing(4),
      borderTop: `${theme.spacing(0.5)}px solid ${theme.palette.primary.dark}`,
      borderLeft: `${theme.spacing(0.25)}px solid ${
        theme.palette.primary.dark
      }`,
    },
    listItemClass: {
      background: 'transparent',
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };
});

const actions = [
  { icon: <HomeOutlined />, name: 'Home', slug: '/' },
  { icon: <InfoOutlined />, name: 'About', slug: 'about/' },
  { icon: <PhotoAlbumOutlined />, name: 'Portfolio', slug: 'portfolio/' },
  { icon: <ContactMailOutlined />, name: 'Contact', slug: 'contact/' },
];

const toNav = (handleClose, listItemClass) => ({ name, icon, slug }) => {
  const handleClick = () => {
    handleClose();
    navigate(slug);
  };
  return (
    // <Link to={slug}>
    <ListItem button key={name} onClick={handleClick} className={listItemClass}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
    // </Link>
  );
};

const Nav = props => {
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
      <SwipeableDrawer
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
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        anchor="right"
      >
        <Button onClick={handleToggle} className={classes.menuButton}>
          <CloseOutlined titleAccess="Close Nav Menu" fontSize="large" />
        </Button>
        <List disablePadding className={classes.menuBar} elevation={5}>
          <ListItem key={'Felipe Flores'} className={classes.menuHeading}>
            <ListItemText
              primary={'Felipe Flores'}
              primaryTypographyProps={{ color: 'primary', variant: 'h6' }}
              secondary={'Artist and graphic illustrator'}
              secondaryTypographyProps={{
                color: 'textPrimary',
                style: {
                  marginBottom: 0,
                },
              }}
              style={{ opacity: 0.75 }}
            />
          </ListItem>
          {actions.map(toNav(handleClose, classes.listItemClass))}
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Nav;
