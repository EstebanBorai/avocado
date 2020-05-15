import React from 'react';
import Main from 'components/Main';
import { FileContextProvider } from 'context/file';
import { DialogContextProvider } from 'context/dialog';

const App = (): JSX.Element => (
  <DialogContextProvider>
    <FileContextProvider>
      <Main />
    </FileContextProvider>
  </DialogContextProvider>
);

export default App;
