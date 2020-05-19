import { DefaultTheme } from 'styled-components';

const Theme: DefaultTheme = {
  fonts: {
    body: "'Source Sans Pro', sans-serif;",
    heading: "'Passion One', sans-serif",
    monospace: "'Source Code Pro', monospace",
  },

  borderRadius: '.4rem',

  colors: {
    primary: '#073E66',
    secondary: '#AF4448',
    success: '#28C76F',
    info: '#00CFE8',
    warning: '#FF9F43',
    danger: '#EA5455',
    blue: '#007BFF',
    indigo: '#6610F2',
    purple: '#6F42C1',
    pink: '#E83E8C',
    red: '#DC3545',
    orange: '#FD7E14',
    yellow: '#FFC107',
    green: '#28A745',
    teal: '#20C997',
    cyan: '#17A2B8',
    white: '#FFF',
    gray: '#6C757D',
    grayDark: '#343A40',
    light: '#F8F9FA',
    dark: '#343A40',
    snow: '#F7F7F7',
  },

  breakpoint: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
}

export default Theme;
