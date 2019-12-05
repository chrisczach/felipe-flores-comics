import { createMuiTheme } from '@material-ui/core/styles';
import { green, grey, red } from '@material-ui/core/colors';

// WIP need to setup style

const inspo = {
  coral: '#E14658',
  navy: '#222252',
  mountain: '#3F3250',
  scrub: '#C0B3A0',
};
const rawTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#E2E1D7',
      main: '#8692A8',
      dark: '#2E253A',
    },
    secondary: {
      light: '#D4DBBD',
      main: '#585246',
      dark: '#3A4224',
    },
    warning: {
      main: '#f0db4f',
      dark: '#c0af3f',
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      xLight: green[50],
      main: green[300],
      dark: green[700],
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 100, // Work Sans
    fontWeightRegular: 300, // Work Sans
    fontWeightMedium: 400, // Playfair Display Condensed
    fontFamilySecondary: "'Raleway', sans-serif",
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  // textTransform: 'uppercase',
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      // default: rawTheme.palette.primary.dark,
      default: rawTheme.palette.primary.dark,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;