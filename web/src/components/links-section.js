import React, { useContext } from 'react';
import {
  makeStyles,
  Box,
  Paper,
  lighten,
  darken,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  ListSubheader
} from '@material-ui/core';

import { SiteLinksContext } from './layout';
import Img from 'gatsby-image';

const useStyles = makeStyles( theme => {
  const backgroundColor = lighten( theme.palette.secondary.main ,0.8)
  return {
  root: {
    float: 'right',
    margin: theme.spacing(0, 0, 2, 2),
    background: `linear-gradient(22.5deg,  transparent 55%, ${backgroundColor} 55%)`,
    paddingBottom: theme.spacing( 4 ),
    [ theme.breakpoints.down( 'xs' ) ]: {
    background: `linear-gradient(-45deg,  transparent 50%, ${lighten(backgroundColor,.15)} 50%)`,
      float: 'unset',
      margin: theme.spacing(1, 0, 2, 0),
      padding: theme.spacing(2, 0 ),
    }
  },

  linkItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    [ theme.breakpoints.down( 'xs' ) ]: {
      justifyContent: 'center',
    }
  },
  linkIcon: {
    width: theme.typography.fontSize * 1.5,
    height: theme.typography.fontSize * 1.5,
    marginRight: theme.typography.fontSize,
  },
    linkText: {
    flexGrow: 0,
  },
  subheader: {
    textAlign: 'right',
    [ theme.breakpoints.down( 'xs' ) ]: {
      textAlign: 'center',
      margin: theme.spacing(2,0,1,0),
    },
    margin: theme.spacing(2,0,1,0),
    }
}});

const LinksSection = props => {
  const classes = useStyles(props);
  const siteLinks = useContext(SiteLinksContext);
  return (
    <Paper square className={classes.root}>
      <List subheader={
        <ListSubheader component="div"  className={classes.subheader}><Typography variant='h5'>Where to find me!</Typography></ListSubheader>
      }>{siteLinks.map(toLink)}</List>
    </Paper>
  );
};

const toLink = ({ linkTitle, linkUrl, fluid, ...props }) => {
  const classes = useStyles(props);
  return (
    <ListItem
      component="a"
      button
      href={linkUrl}
      target="_blank"
      className={classes.linkItem}
    >
      <Box className={classes.linkIcon}>  <Img fluid={fluid} /></Box>
      <ListItemText className={classes.linkText}>{linkTitle}</ListItemText>
    </ListItem>
  );
};

export default LinksSection;
