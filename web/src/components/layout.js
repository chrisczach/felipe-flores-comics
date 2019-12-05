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

const Layout = ( { children, onHideNav, onShowNav, showNav, siteTitle } ) => (
    <>
    <Button variant='contained' color='primary'>Header</Button>
    <Container maxWidth='lg'>
      { children }
      </Container>
        <Button variant='contained' color='secondary'>Footer</Button>
        </>
)

export default Layout
