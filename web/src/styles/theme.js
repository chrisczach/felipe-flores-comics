import { createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#C72027', contrastText: '#f7dcc6' },
  secondary: { main: '#FFCA06', contrastText: '#331a07' }
};

const typography = {
  fontFamily: [ 'Roboto', 'sans-serif' ],
  body1: {
    fontFamily: ['Didact Gothic', 'sans-serif' ]
  },
  body2: {
    fontFamily: [ 'Didact Gothic', 'sans-serif' ]
  }
}


const themeName = 'Cardinal Supernova Bat';

export default responsiveFontSizes(createMuiTheme({ palette, typography, themeName }), {factor: 4});