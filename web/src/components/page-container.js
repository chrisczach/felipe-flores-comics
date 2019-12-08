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
import { graphql, StaticQuery } from 'gatsby';

const useStyles = hero =>
  makeStyles(theme => {
    const backgroundColor = fade(theme.palette.secondary.light, 0.5);
    return {
      root: {
        pointerEvents: 'none',
        position: hero ? 'fixed' : 'sticky',
        top: 0,
        background: 'transparent',
        display: 'flex',
        flexDirection: 'row',
      },
      titleWrap: {
        position: 'relative',
        background: 'transparent',
        padding: theme.spacing(1, 3, 1, 1),
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
      heading: {
        fontVariant: 'small-caps',
        fontWeight: 'bold',
        opacity: 0.65,
      },
      subHeading: {
        opacity: 0.75,
        marginBottom: 0,
      },
      pageTitle: {
        position: 'relative',
        height: '100%',
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

const PageContainer = ({ children, pageTitle = '', hero = null, ...props }) => {
  const classes = useStyles(hero)(props);
  return (
    <StaticQuery
      query={query}
      render={data => (
        <>
          {hero && hero}
          <Paper square elevation={0} className={classes.root}>
            <Box className={classes.titleWrap}>
              <Typography
                variant="h5"
                color="primary"
                className={classes.heading}
              >
                {data.site.title}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                className={classes.subHeading}
              >
                {data.site.subtitle}
              </Typography>
            </Box>
            {pageTitle && (
              <Hidden xsDown implementation="css">
                <Box className={classes.pageTitle}>
                  <Typography variant="h4">{pageTitle}</Typography>
                </Box>
              </Hidden>
            )}
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
      )}
    />
  );
};

const query = graphql`
  query PageContainerQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      subtitle
      footer: _rawFooterText
    }
  }
`;

export default PageContainer;
