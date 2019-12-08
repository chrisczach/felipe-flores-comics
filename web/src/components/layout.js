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

const Layout = ({
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
    {children}
    <Footer {...{ siteTitle, siteFooter }} />
  </>
);

export default Layout;
