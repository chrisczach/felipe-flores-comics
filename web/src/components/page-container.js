import React from 'react';
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Box,
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
        background: backgroundColor,
      },
    },
    subHeading: {
      opacity: 0.75,
      marginBottom: 0,
    },
    pageTitle: {
      marginLeft: theme.spacing(8),
      display: 'flex',
      alignItems: 'center',
    },
  };
});

const PageContainer = ({
  children,
  heading = 'Felipe Flores Comics',
  subHeading = 'Artist and graphic illustrator',
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
          <Typography variant="h4">Page Title</Typography>
        </Box>
      </Paper>
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};

export default PageContainer;
