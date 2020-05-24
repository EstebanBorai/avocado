import React, { useContext } from 'react';
import Console from 'components/Console';
import WebSocketContext from '../context/websocket';

function WebSocketMain(): JSX.Element {
  const { connect, send, stream, isConnected } = useContext(WebSocketContext);

  return (
    <Console
      stream={stream}
      connect={connect}
      send={send}
      isConnected={isConnected}
    />
  );
}

export default WebSocketMain;
