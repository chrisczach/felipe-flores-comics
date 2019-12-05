import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {SpeedDial, SpeedDialIcon, SpeedDialAction} from '@material-ui/lab';
import {FileCopyOutlined, SaveOutlined, PrintOutlined, ShareOutlined, FavoriteOutlined, MenuOutlined, CloseOutlined} from '@material-ui/icons';

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
  }
}));

const actions = [
  { icon: <FileCopyOutlined />, name: 'Copy' },
  { icon: <SaveOutlined />, name: 'Save' },
  { icon: <PrintOutlined />, name: 'Print' },
  { icon: <ShareOutlined />, name: 'Share' },
  { icon: <FavoriteOutlined />, name: 'Like' },
];

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SpeedDial
      direction='down'
        ariaLabel="Navigation Menu"
        className={classes.speedDial}
      icon={<SpeedDialIcon openIcon={<CloseOutlined />} icon={ <MenuOutlined /> } />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={ action.icon }
            tooltipOpen
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
  );
}

export default Header