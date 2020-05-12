import React from 'react';
import './log.scss';
import { WebSocketMessage, WebSocketCode } from '../../service/websocket.service';

interface LogItemProps {
  message: WebSocketMessage;
}

function LogItem({ message }: LogItemProps): JSX.Element {
  if (message.code === WebSocketCode.Error) {
    return (
      <li className="websocket-log error">
        <span className="message-type">Type: Error</span>
        <span>{message.data}</span>
      </li>
    );
  }

  if (message.code === WebSocketCode.ReceivedMessage) {
    return (
      <li className="websocket-log received">
        <span className="message-type">Type: Received</span>
        <span>{message.data}</span>
      </li>
    );
  }

  if (message.code === WebSocketCode.SentMessage) {
    return (
      <li className="websocket-log sent">
        <span className="message-type">Type: Sent</span>
        <span>{message.data}</span>
      </li>
    );
  }

  if (message.code === WebSocketCode.Open || message.code === WebSocketCode.Closed) {
    return (
      <li className="websocket-log network">
        <span className="message-type">Type: Network</span>
        <span>
          {
            message.code === WebSocketCode.Open
              ? 'Connection Established'
              : 'Connection Finished'
          }
        </span>
      </li>
    );
  }

  return (
    <li className="websocket-log unknown">
      <span className="message-type">Type: Unknown</span>
      <span>{message?.data}</span>
    </li>
  );
}

export default LogItem;
