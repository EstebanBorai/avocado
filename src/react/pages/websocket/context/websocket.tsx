import * as React from 'react';
import WebSocketService, { IWebSocketService, WebSocketError, WebSocketMessage } from '../service/websocket.service';
import { Subscription } from 'rxjs';

export interface IWebSocketContext {
  messages: WebSocketMessage[];
  error: WebSocketError;
  connect: (url: string) => void;
  send: (message: string) => void;
}

export interface WebSocketContextProps {
  children: JSX.Element | JSX.Element[];
}

const WebSocketContext = React.createContext(undefined);

export function WebSocketContextProvider(props: WebSocketContextProps): JSX.Element {
  const { current: webSocketService } = React.useRef<IWebSocketService>(new WebSocketService());
  const [messages, setMessages] = React.useState<WebSocketMessage[]>([]);
  const [error, setError] = React.useState<WebSocketError>(null);

  React.useEffect(() => {
    const subs = new Subscription();

    subs.add(webSocketService.messageSubject.subscribe((message: MessageEvent) => {
      const next = [...messages];
      next.push(message);

      setMessages(next);
    }));

    subs.add(webSocketService.errorSubject.subscribe((err: WebSocketError) => {
      setError(err);
    }));

    return () => {
      subs.unsubscribe();
    };
  }, []);

  const connect = React.useCallback((url: string) => {
    webSocketService.connect(url);
  }, []);

  const send = React.useCallback((message: string) => {
    webSocketService.send(message);
  }, []);

  const value: IWebSocketContext = {
    connect,
    send,
    messages,
    error
  }

  return (
    <WebSocketContext.Provider value={value}>
      {props.children}
    </WebSocketContext.Provider>
  );
}

WebSocketContext.displayName = 'WebSocketContext';

export default WebSocketContext;
