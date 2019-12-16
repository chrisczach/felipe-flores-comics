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
    width: '100%',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'stretch',
    marginTop: theme.spacing(4),
    // overflow: 'hidden',
  },
  link: {
    padding: theme.spacing(4),
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
    </Box>
  );
};

export default HomeLinks;
