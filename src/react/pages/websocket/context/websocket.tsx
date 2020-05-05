import React, { useState, useRef, useEffect } from 'react';
import WebSocketService, { IWebSocketService, WebSocketError, WebSocketMessage } from '../service/websocket.service';
import { Subscription } from 'rxjs';

export interface IWebSocketContext {
  messages: WebSocketMessage[];
  error: WebSocketError;
  isConnected: boolean;
  connect: (url: string) => void;
  send: (message: string) => void;
}

export interface WebSocketContextProps {
  children: JSX.Element | JSX.Element[];
}

const WebSocketContext = React.createContext(undefined);

export function WebSocketContextProvider(props: WebSocketContextProps): JSX.Element {
  const { current: webSocketService } = useRef<IWebSocketService>(new WebSocketService());
  const [isConnected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [error, setError] = useState<WebSocketError>(null);

  useEffect(() => {
    const subs = new Subscription();

    subs.add(webSocketService.isConnected.subscribe((next: boolean) => {
      setConnected(next);
    }));

    subs.add(webSocketService.messageSubject.subscribe((message: WebSocketMessage) => {
      const next = [...messages, message];

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
    isConnected,
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
