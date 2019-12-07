import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#C72027', contrastText: '#f7dcc6' },
  secondary: { main: '#FFCA06', contrastText: '#331a07' },
  // background: {
  //   default: '#FF0000',
  //   paper: '#FF0000',
  // },
};

const typography = {
  fontFamily: ['Montserrat', 'sans-serif'].join(', '),
  body1: {
    fontFamily: ['Didact Gothic', 'sans-serif'].join(', '),
    marginBottom: '1em',
  },
  body2: {
    fontFamily: ['Didact Gothic', 'sans-serif'].join(', '),
    marginBottom: '1em',
  },
};

const themeName = 'Cardinal Supernova Bat';

export default responsiveFontSizes(createMuiTheme({ palette, typography }), {
  factor: 4,
});
