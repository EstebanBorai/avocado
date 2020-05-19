import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      heading: string;
      body: string;
      monospace: string;
    }

    borderRadius: string;

    colors: {
      primary: string;
      secondary: string;
      success: string;
      info: string;
      warning: string;
      danger: string;
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      teal: string;
      cyan: string;
      white: string;
      gray: string;
      grayDark: string;
      light: string;
      dark: string;
      snow: string;
    },

    breakpoint: {
      xs: string;
      sm: string;
      md: string
      lg: string;
      xl: string;
    }
  }
}
