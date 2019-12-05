import React from 'react'
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

import Header from './header'
import Footer from './footer'

const Layout = ( { children, onHideNav, onShowNav, showNav, siteTitle } ) => (
    <>
    <Header/>
    <Container maxWidth='lg'>
      { children }
      </Container>
        <Footer/>
        </>
)

export default Layout
