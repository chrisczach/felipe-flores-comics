import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import {
  HomeOutlined,
  InfoOutlined,
  PhotoAlbumOutlined,
  ContactMailOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <HomeOutlined />, name: 'Home', slug: '/' },
  { icon: <InfoOutlined />, name: 'About', slug: 'about/' },
  { icon: <PhotoAlbumOutlined />, name: 'Portfolio', slug: 'portfolio/' },
  { icon: <ContactMailOutlined />, name: 'Contact', slug: 'contact/' },
];

const toNav = handleClose => ({ name, icon, slug }) => {
  const clickHandler = () => {
    handleClose();
    navigate(slug);
  };
  return (
    <SpeedDialAction
      key={name}
      icon={icon}
      tooltipOpen
      tooltipTitle={name}
      onClick={clickHandler}
    />
  );
};

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(open => !open);
  };

  return (
    <SpeedDial
      direction="down"
      ariaLabel="Navigation Menu"
      className={classes.speedDial}
      icon={
        <SpeedDialIcon openIcon={<CloseOutlined />} icon={<MenuOutlined />} />
      }
      onClose={handleClose}
      onClick={handleToggle}
      open={open}
    >
      {actions.map(toNav(handleClose))}
    </SpeedDial>
  );
};

export default Header;
