import * as React from 'react';
import Main from './components/Main';
import { WebSocketContextProvider } from './context/websocket';

const WebSocketSection = (): JSX.Element => (
  <WebSocketContextProvider>
    <Main />
  </WebSocketContextProvider>
);

export default WebSocketSection;
