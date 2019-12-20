import React, { useContext } from 'react';
import {
  makeStyles,
  Box,
  Paper,
  lighten,
  darken,
  List,
  fade,
  ListItem,
  ListItemIcon,
  Typography,
  ListItemText,
  ListSubheader,
  useMediaQuery,
} from '@material-ui/core';

import BackgroundImage from 'gatsby-background-image';
import { SiteLinksContext } from './layout';
import { getImageInfo } from '../lib/get-image-info';

const useStyles = (small = false) =>
  makeStyles(theme => {
    const buttonColor = fade(theme.palette.background.default, 0.75);
    const accent = lighten(theme.palette.primary.main, 0.1);
    return {
      backgroundWrapper: {
        width: small ? '75%' : '100%',
        boxShadow: theme.shadows[4],
        '&:hover': {
          boxShadow: theme.shadows[8],
        },
        margin: theme.spacing(0, 16),
        [theme.breakpoints.up('lg')]: {
          margin: theme.spacing(0, 0, 0, 2),
        },
        [theme.breakpoints.down('md')]: {
          width: '100%',
          margin: theme.spacing(0),
        },
      },
      list: {
        background: 'transparent',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: theme.spacing(4),
        minHeight: '65vh',
        [theme.breakpoints.down('sm')]: {
          minHeight: '55vh',
        },
      },
      heading: {
        fontVariant: 'small-caps',
        color: theme.palette.getContrastText(theme.palette.primary.main),
        display: 'inline-block',
        padding: theme.spacing(2, 4),
        background: lighten(theme.palette.primary.main, 0.1),
        marginBottom: theme.spacing(4),
      },
      footer: {
        margin: 0,
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontVariant: 'small-caps',
        color: theme.palette.getContrastText(
          darken(theme.palette.primary.dark, 0.75),
        ),
        display: 'inline-block',
        padding: theme.spacing(0, 4),
        background: darken(theme.palette.primary.dark, 0.75),
      },
      link: {
        textAlign: 'center',
        margin: theme.spacing(2, 0),
        [theme.breakpoints.down('sm')]: {
          maxWidth: '75%',
          margin: theme.spacing(4),
        },
        '@media (hover:hover)': {
          '&:hover': {
            filter: `saturate(1.2)`,
            transform: `skewX(-15deg) translateY(${theme.spacing(-0.5)}px)`,
          },
        },
        textDecoration: 'none',
        padding: theme.spacing(2, 4),
        maxWidth: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transform: `skewX(-15deg)`,
        border: `${theme.spacing(0.5)}px solid ${accent}`,
        backgroundImage: `radial-gradient(${lighten(
          theme.palette.primary.light,
          0.45,
        )} 10%, transparent 10%), radial-gradient(${lighten(
          theme.palette.primary.light,
          0.55,
        )} 10%, transparent 10%)`,
        backgroundColor: `${theme.palette.secondary.light} !important`,
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
        // '&:after': {
        //   background: accent,
        //   height: theme.spacing(1),
        //   content: '""',
        //   transform: 'translateX(100%)',
        //   position: 'absolute',
        //   top: '50%',
        //   right: 0,
        //   left: 0,
        // },
      },
      linkText: {
        fontWeight: 700,
        fontVariant: 'small-caps',
        transform: `skewX(15deg)`,
        color: accent,
      },
    };
  });
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const ContactPageLinks = ({ _ref, small = false, ...props }) => {
  const classes = useStyles(small)(props);
  const siteLinks = useContext(SiteLinksContext);

  const d = new Date();
  return (
    <BackgroundImage
      {...getImageInfo({ _ref })}
      className={classes.backgroundWrapper}
    >
      <Typography variant="h3" className={classes.heading}>
        Where to Find Me
      </Typography>
      <List
        className={classes.list}
        // subheader={
        //   <ListSubheader disableSticky component="div" className={classes.heading}>
        //     <Typography variant={isPhone ? 'h3' : 'h4'}>
        //       Where to find me!
        //     </Typography>
        //   </ListSubheader>
        // }
      >
        {siteLinks.map(toLink)}
      </List>
      <Typography variant="body1" className={classes.footer}>
        {`Social Media Issue - ${months[d.getMonth()]} ${d.getFullYear()}`}
      </Typography>
    </BackgroundImage>
  );
};

const toLink = ({ linkTitle, linkUrl, fluid, ...props }) => {
  const classes = useStyles()(props);
  const isPhoneOrTablet = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <ListItem
      component="a"
      button
      href={linkUrl}
      target="_blank"
      className={classes.link}
    >
      <Box> {/* <Img fluid={fluid} /> */}</Box>
      <ListItemText
        className={classes.linkText}
        primaryTypographyProps={{
          variant: isPhoneOrTablet ? 'h5' : 'h6',
          style: { fontWeight: 700 },
        }}
      >
        {linkTitle}
      </ListItemText>
    </ListItem>
  );
};

export default ContactPageLinks;
