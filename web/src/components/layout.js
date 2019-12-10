import React from 'react';
import {
  Container,
  Paper,
  Collapse,
  Typography,
  TextField,
  Zoom,
  Fade,
  Grow,
  Slide,
  Breadcrumbs,
  Box,
  Button,
} from '@material-ui/core';

import Nav from './nav';
import Footer from './footer';
import PageTransition from './page-transition';

const Layout = ({
  location,
  children,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  siteSubtitle,
  siteFooter,
}) => (
  <>
    <Nav {...{ siteTitle, siteSubtitle }} />
    <PageTransition location={location}>{children}</PageTransition>
    <Footer {...{ siteTitle, siteFooter }} />
  </>
);

export default Layout;
