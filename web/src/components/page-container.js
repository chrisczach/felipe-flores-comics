import React from 'react';
import { navigate, Link as GatsbyLink, graphql, StaticQuery } from 'gatsby';
import {
  Container,
  Link,
  Typography,
  Paper,
  makeStyles,
  Breadcrumbs,
  Box,
  Hidden,
  fade,
  lighten,
} from '@material-ui/core';

import BackgroundImage from 'gatsby-background-image';
import { getImageInfo } from '../lib/get-image-info';

const useStyles = hero =>
  makeStyles(theme => {
    const backgroundColor = lighten(theme.palette.secondary.light, 0.5);

    return {
      root: {
        zIndex: 1000,
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
        padding: theme.spacing(1, 3, 1, 1),
        zIndex: 50,
        '&::before': {
          backdropFilter: `blur(10px)`,
          WebkitBackdropFilter: 'blur(10px)',
          borderRight: `${lighten(
            theme.palette.primary.dark,
            0.5,
          )} solid ${theme.spacing(2)}px`,
          borderBottom: `${lighten(
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
          backgroundImage: `radial-gradient(${lighten(
            theme.palette.secondary.main,
            0.15,
          )} 10%, transparent 10%), radial-gradient(${lighten(
            theme.palette.secondary.main,
            0.05,
          )} 10%, transparent 10%)`,
          backgroundColor: lighten(theme.palette.secondary.light, 0.45),
          backgroundPosition: `0 0, 5px 5px`,
          backgroundSize: `10px 10px`,
        },
      },
      heading: {
        fontVariant: 'small-caps',
        fontWeight: 'bold',
        opacity: 0.85,
      },
      subHeading: {
        opacity: 0.75,
        marginBottom: 0,
      },
      pageTitle: {
        position: 'relative',
        height: '100%',
        marginLeft: theme.spacing(8),
        color: lighten(
          theme.palette.getContrastText(theme.palette.background.default),
          0.25,
        ),
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        '&::before': {
          backdropFilter: `blur(10px)`,
          WebkitBackdropFilter: 'blur(10px)',
          content: '""',
          zIndex: -1,
          position: 'absolute',
          top: 0,
          right: theme.spacing(-4),
          bottom: 0,
          left: theme.spacing(-6),
          transform: 'skewX(-45deg)',
          background: lighten(theme.palette.background.default, 0.5),
        },
      },
      container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        // remove min height later
        minHeight: '50vh',
      },
      hero: {
        backgroundAttachment: 'fixed',
        height: '75vh',
        [theme.breakpoints.down('sm')]: {
          height: '50vh',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: `${theme.spacing(0.5)}px solid ${lighten(
          theme.palette.primary.dark,
          0.35,
        )}`,
      },
      captionText: {
        color: theme.palette.background.default,
        // mixBlendMode: `difference`,
      },
    };
  });

const PageContainer = ({
  children,
  pageTitle = '',
  hideTitleOnPortrait = false,
  heroImage = {},
  //  need to setup
  breadcrumbs = null,
  ...props
}) => {
  const classes = useStyles(heroImage)(props);
  const { fluid = null } =
    heroImage && heroImage.asset && heroImage.asset._id
      ? getImageInfo({ _ref: heroImage.asset._id })
      : {};

  return (
    <StaticQuery
      query={query}
      render={data => (
        <>
          {heroImage && (
            <BackgroundImage
              fluid={fluid}
              fadeIn
              durationFadeIn={1000}
              className={classes.hero}
            >
              <Typography
                variant="h1"
                color="primary"
                className={classes.captionText}
              >
                {heroImage.caption}
              </Typography>
            </BackgroundImage>
          )}
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
            {breadcrumbs && (
              <Breadcrumbs aria-label="breadcrumb">
                {[
                  {
                    slug: '/',
                    title: 'Home',
                  },
                  ...breadcrumbs,
                ].map(({ slug, title }, i, a) => {
                  const isLast = a.length - 1 === i;
                  const ComponentToUse = isLast ? Typography : Link;
                  const propsToUse = isLast
                    ? {
                        color: 'primary',
                        style: {
                          marginBottom: 0,
                          fontWeight: 'bold',
                          opacity: 0.75,
                        },
                      }
                    : { to: slug, component: GatsbyLink };
                  return (
                    // @ts-ignore
                    <ComponentToUse {...propsToUse}>{title}</ComponentToUse>
                  );
                })}
              </Breadcrumbs>
            )}
            {pageTitle && !hideTitleOnPortrait && (
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
      footer: _rawFooterText(resolveReferences: { maxDepth: 5 })
    }
  }
`;

export default PageContainer;
