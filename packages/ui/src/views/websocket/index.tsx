import * as React from 'react';
import View from 'components/View';
import { WebSocketContextProvider } from './context/websocket';
import Main from './components/Main';

const WebSocketSection = (): JSX.Element => (
  <WebSocketContextProvider>
    <View>
      <Main />
    </View>
  </WebSocketContextProvider>
);

export default WebSocketSection;
