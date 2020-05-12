import * as React from 'react';
import View from 'components/View';
import Main from './components/Main';
import { WebSocketContextProvider } from './context/websocket';

const WebSocketSection = (): JSX.Element => (
  <WebSocketContextProvider>
    <View>
      <Main />
    </View>
  </WebSocketContextProvider>
);

export default WebSocketSection;
