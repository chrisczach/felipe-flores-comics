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
      '@media( hover: hover ) ': {
        '&:hover': {
          background: `linear-gradient(45deg, transparent 15%, ${theme.palette.background.default} 15%)`,
        },
      },
    },
    menuButtonClosed: {
      borderRadius: 0,
      position: 'fixed',
      top: 0,
      color: theme.palette.primary.dark,
      right: 0,
      zIndex: 1000,
      background: 'transparent',
    },
    menuBar: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: theme.spacing(8, 2, 8, 4),
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // WIP MAYBE
      transform: `skewX(15deg) !important`,
      alignItems: 'flex-start',
      '&::before': {
        // transform: `skewX(15deg) translateX(${theme.spacing(4)}px)`,
        // transform: `translateX(${theme.spacing(4)}px) `,
        transformOrigin: '0 0',
        borderLeft: `${theme.spacing(1)}px solid ${accent}`,
        borderBottom: `${theme.spacing(1.5)}px solid ${accent}`,
        content: '""',
        top: 0,
        right: theme.spacing(-8),
        bottom: 0,
        left: theme.spacing(10),
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
      '&:after': {
        background: accent,
        height: theme.spacing(1),
        content: '""',
        transform: 'translateX(100%)',
        position: 'absolute',
        top: '50%',
        right: 0,
        left: 0,
      },
    },
    navTitle: {
      margin: theme.spacing(1, 2),
    },
    menuPaper: {},

    listItemClass: {
      width: 'auto',
      transform: `skewX(-15deg)`,
      background: `${lighten(accent, 0.15)}`,
      color: theme.palette.background.default,
      margin: theme.spacing(1, -40, 1, 0),
      paddingRight: theme.spacing(40),
      borderTop: `${theme.spacing(0.1)}px solid ${fade(
        theme.palette.primary.main,
        0.75,
      )}`,
      borderLeft: `${theme.spacing(0.5)}px solid ${fade(
        theme.palette.primary.main,
        0.75,
      )}`,
      borderBottom: `${theme.spacing(0.15)}px solid ${
        theme.palette.primary.main
      }`,
      // border: `${theme.spacing(0.5)}px solid ${accent}`,
      // background: 'transparent',
      '&:after': {
        content: '""',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        left: theme.spacing(20),
        transform: 'skewX(15deg)',
        background: fade(theme.palette.primary.main, 0.25),
      },
      '&:hover': {
        background: `${accent} !important`,
      },
      '@media( hover: hover ) ': {
        '&:hover': {
          color: theme.palette.background.default,
          '&::after': {
            transform: `skewX(0deg)`,
            transition: theme.transitions.create('all', {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
          },
          transform: `translateX(${theme.spacing(-2)}px) skewX(-15deg)`,
          transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          borderLeft: `${theme.spacing(0.5)}px solid ${fade(
            theme.palette.secondary.main,
            0.75,
          )}`,
        },
      },
    },
    outline: {
      content: '""',
      position: 'absolute',
      right: 0,
      top: theme.spacing(-1),
      bottom: theme.spacing(-1),
      zIndex: -1,
      left: theme.spacing(-1),
      background: 'blue',
    },
  };
});

const actions = [
  { icon: <HomeOutlined color="secondary" />, name: 'Home', slug: '/' },
  { icon: <InfoOutlined color="secondary" />, name: 'About', slug: 'about/' },
  {
    icon: <PhotoAlbumOutlined color="secondary" />,
    name: 'Portfolio',
    slug: 'portfolio/',
  },
  {
    icon: <ContactMailOutlined color="secondary" />,
    name: 'Contact',
    slug: 'contact/',
  },
];

const toNav = (handleClose, listItemClass) => ({ name, icon, slug }, index) => {
  const handleClick = () => {
    handleClose();
    navigate(slug);
  };
  return (
    // <Link to={slug}>
    <Slide
      in
      key={name + 'transition'}
      direction="left"
      timeout={index * 250 + 500}
    >
      <Box key={name}>
        <ListItem
          key={name + 'item'}
          button
          onClick={handleClick}
          className={listItemClass}
        >
          <ListItemIcon key={name + 'icon'}>{icon}</ListItemIcon>
          <ListItemText key={name + 'text'} primary={name} />
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
        <Button
          onClick={handleToggle}
          className={classes.menuButtonClosed}
          key="menuButton"
        >
          <CloseOutlined titleAccess="Close Nav Menu" fontSize="large" />
        </Button>
        <Slide in direction="down" timeout={500}>
          <List disablePadding className={classes.menuBar} key={'menuBar'}>
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
