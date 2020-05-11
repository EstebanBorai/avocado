import React, { useContext } from 'react';
import './log.scss';
import Control, { Header } from 'components/Control';
import WebSocketContext, { IWebSocketContext } from '../../context/websocket';
import { WebSocketMessage } from '../../service/websocket.service';
import LogItem from './LogItem';

function Log(): JSX.Element {
  const { messages } = useContext<IWebSocketContext>(WebSocketContext);

  return (
    <Control>
      <Header title="Log" />
      <ol id="log-list-websocket">
        {
          messages?.map((message: WebSocketMessage, index: number) => (
            <LogItem key={index} message={message} />
          ))
        }
      </ol>
    </Control>
  );
}

export default Log;
