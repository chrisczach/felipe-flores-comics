import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  menuButton: {
    position: 'fixed',
    top: 0,
    right: 0,
  },
  menuPaper: {
    height: 'auto',
    display: 'inline-flex',
    top: '10vh',
    position: 'absolute',
    right: 0,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const actions = [
  { icon: <HomeOutlined />, name: 'Home', slug: '/' },
  { icon: <InfoOutlined />, name: 'About', slug: 'about/' },
  { icon: <PhotoAlbumOutlined />, name: 'Portfolio', slug: 'portfolio/' },
  { icon: <ContactMailOutlined />, name: 'Contact', slug: 'contact/' },
];

const toNav = handleClose => ({ name, icon, slug }) => {
  const handleClick = () => {
    handleClose();
    navigate(slug);
  };
  return (
    // <Link to={slug}>
    <ListItem button key={name} onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
    // </Link>
  );
};

const Header = props => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(open => !open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleToggle} className={classes.menuButton}>
        {open ? (
          <CloseOutlined titleAccess="Close Nav Menu" fontSize="large" />
        ) : (
          <MenuOutlined titleAccess="Open Nav Menu" fontSize="large" />
        )}
      </Button>
      <SwipeableDrawer
        PaperProps={{ className: classes.menuPaper }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        anchor="right"
      >
        <List>
          <ListItem key={'Felipe Flores'} >
            <ListItemText
              primary={'Felipe Flores'}
              secondary={'Artist and graphic illustrator'}
            />
          </ListItem>
          {actions.map(toNav(handleClose))}
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Header;
