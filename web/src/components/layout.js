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
    <div>Header</div>
    <div>{ children }</div>
        <Paper>Footer</Paper>
        </>
)

export default Layout
