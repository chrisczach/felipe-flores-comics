import React from 'react';
import {
  makeStyles,
  Hidden,
  List,
  ListItem,
  Box,
  Typography,
} from '@material-ui/core';
import { Link } from 'gatsby';

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    marginTop: theme.spacing(4),
    // overflow: 'hidden',
  },
  link: {
    transform: 'skewX(-45deg)',
    '& *': {
      transform: 'skewX(45deg)',
    },
    height: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    flexBasis: 1,
    flexGrow: 1,
  },
}));

const HomeLinks = props => {
  const classes = useStyles(props);
  return (
    <Box className={classes.list}>
      <Link to="/about/" className={classes.link}>
        <Typography variant="h5">About</Typography>
      </Link>

      <Link to="/portfolio/" className={classes.link}>
        <Typography variant="h5">Portfolio</Typography>
      </Link>

      <Link to="/contact/" className={classes.link}>
        <Typography variant="h5">Contact</Typography>
      </Link>
    </Box>
  );
};

export default HomeLinks;
