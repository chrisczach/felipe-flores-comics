import React from 'react';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Box,
  Hidden,
  fade,
} from '@material-ui/core';

const useStyles = makeStyles(theme => {
  const backgroundColor = fade(theme.palette.secondary.light, 0.5);
  return {
    root: {
      pointerEvents: 'none',
      position: 'sticky',
      top: 0,
      background: 'transparent',
      display: 'flex',
      flexDirection: 'row',
    },
    titleWrap: {
      position: 'relative',
      background: 'transparent',
      padding: theme.spacing(1),
      zIndex: 50,
      '&::before': {
        backdropFilter: `blur(10px)`,
        borderRight: `${fade(
          theme.palette.primary.dark,
          0.5,
        )} solid ${theme.spacing(2)}px`,
        borderBottom: `${fade(
          theme.palette.primary.light,
          0.5,
        )} solid ${theme.spacing(0.25)}px`,
        content: '""',
        zIndex: -1,
        position: 'absolute',
        top: 0,
        right: theme.spacing(-4),
        bottom: 0,
        left: theme.spacing(-6),
        transform: 'skewX(-45deg)',
        background: backgroundColor,
      },
    },
    subHeading: {
      opacity: 0.75,
      marginBottom: 0,
    },
    pageTitle: {
      position: 'relative',
      marginLeft: theme.spacing(8),
      color: fade(
        theme.palette.getContrastText(theme.palette.background.default),
        0.75,
      ),
      display: 'flex',
      alignItems: 'center',
      background: 'transparent',
      '&::before': {
        backdropFilter: `blur(10px)`,
        content: '""',
        zIndex: -1,
        position: 'absolute',
        top: 0,
        right: theme.spacing(-4),
        bottom: 0,
        left: theme.spacing(-6),
        transform: 'skewX(-45deg)',
        // background: theme.palette.background.default,
      },
    },
    container: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
      // remove min height later
      // minHeight: '100vh',
    },
  };
});

const PageContainer = ({
  children,
  heading = 'Felipe Flores Comics',
  subHeading = 'Artist and graphic illustrator',
  pageTitle = '',
  ...props
}) => {
  const classes = useStyles(props);
  return (
    <>
      <Paper square elevation={0} className={classes.root}>
        <Box className={classes.titleWrap}>
          <Typography variant="h5" color="primary">
            {heading}
          </Typography>
          <Typography
            variant="body1"
            color="textPrimary"
            className={classes.subHeading}
          >
            {subHeading}
          </Typography>
        </Box>

        <Box className={classes.pageTitle}>
          <Hidden xsDown implementation="css">
            <Typography variant="h4">{pageTitle}</Typography>
          </Hidden>
        </Box>
      </Paper>
      <Container maxWidth="lg" className={classes.container}>
        {pageTitle && (
          <Hidden smUp implementation="css">
            <Typography variant="h1">{pageTitle}</Typography>
          </Hidden>
        )}
        {children}
      </Container>
    </>
  );
};

export default PageContainer;
