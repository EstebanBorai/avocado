import * as React from 'react';
import Main from './components/Main';
import { WebSocketContextProvider } from './context/websocket';
import View from 'components/View';

const WebSocketSection = (): JSX.Element => (
  <WebSocketContextProvider>
    <View>
      <Main />
    </View>
  </WebSocketContextProvider>
);

export default WebSocketSection;
