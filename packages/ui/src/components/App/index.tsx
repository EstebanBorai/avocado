import React from 'react';
import Main from 'components/Main';
import { FileContextProvider } from 'context/file';
import { DialogContextProvider } from 'context/dialog';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <DialogContextProvider>
      <FileContextProvider>
        <Main />
      </FileContextProvider>
    </DialogContextProvider>
  </ThemeProvider>
);

export default App;
