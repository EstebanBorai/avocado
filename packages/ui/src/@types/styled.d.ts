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
      snow: string;
    }
  }
}
