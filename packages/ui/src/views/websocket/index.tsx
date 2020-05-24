import React from 'react';
import { WebSocketContextProvider } from './context/websocket';
import Main from './components';

const WebSocketView = (): JSX.Element => (
  <WebSocketContextProvider>
    <Main />
  </WebSocketContextProvider>
);

export default WebSocketView;
