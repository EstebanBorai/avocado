import React, { useContext } from 'react';
import './log.scss';
import Control from 'components/Control';
import WebSocketContext, { IWebSocketContext } from '../../context/websocket';
import { WebSocketMessage } from '../../service/websocket.service';

function Log(): JSX.Element {
  const { messages } = useContext<IWebSocketContext>(WebSocketContext);

  return (
    <Control title="Log">
      <ol id="log-websocket">
        {
          messages && messages.map((message: WebSocketMessage) => (
            <li>{JSON.stringify(message?.data)}</li>
          ))
        }
      </ol>
    </Control>
  );
}

export default Log;
