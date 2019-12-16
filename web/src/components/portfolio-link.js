import React from 'react';
import {
  makeStyles,
  Hidden,
  List,
  ListItem,
  lighten,
  fade,
  Box,
  Fade,
  Grow,
  Typography,
} from '@material-ui/core';
import { Link } from 'gatsby';
import { useInView } from 'react-intersection-observer';

const useStyles = makeStyles(theme => {
  const buttonColor = fade(theme.palette.background.default, 0.75);
  const accent = lighten(theme.palette.primary.main, 0.25);
  return {
    list: {
      display: 'flex',
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'stretch',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      justifyContent: 'stretch',
      marginTop: theme.spacing(6),
      // overflow: 'hidden',
    },
    firstLink: {
      margin: theme.spacing(0, 2),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 2, 2, 2),
      },
    },
    secondLink: {
      margin: theme.spacing(0, 2),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 0, 0, 2),
      },
    },
    link: {
      '@media (hover:hover)': {
        '&:hover': {
          filter: `saturate(1.2)`,
          transform: `translateX(${theme.spacing(
            -2,
          )}px) skewX(-15deg) translateY(${theme.spacing(-0.5)}px)`,
        },
      },
      textDecoration: 'none',
      padding: theme.spacing(2, 4),
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      transform: `translateX(${theme.spacing(-2)}px) skewX(-15deg)`,
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
      transform: `skewX(15deg)`,
      color: accent,
    },
  };
});

const PortfolioLink = props => {
  const classes = useStyles(props);
  const [ref, inView, entry] = useInView({ threshold: 0.1 });
  return (
    <div ref={ref}>
      <Grow in={inView} timeout={1200}>
        <Box className={classes.list}>
          <Link to="/about/" className={classes.link + ' ' + classes.firstLink}>
            <Typography variant="h5" className={classes.linkText}>
              About
            </Typography>
          </Link>

          <Link
            to="/portfolio/"
            className={classes.link + ' ' + classes.secondLink}
          >
            <Typography variant="h5" className={classes.linkText}>
              Portfolio
            </Typography>
          </Link>
        </Box>
      </Grow>
    </div>
  );
};

export default PortfolioLink;
