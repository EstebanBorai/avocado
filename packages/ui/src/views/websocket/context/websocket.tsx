import React, { useState, useRef, useEffect, useCallback, createContext } from 'react';
import WebSocketService, { IWebSocketService, WebSocketMessage } from '../service/websocket.service';

export interface IWebSocketContext {
  messages: WebSocketMessage[];
  isConnected: boolean;
  connect: (url: string) => void;
  send: (message: string) => void;
}

export interface WebSocketContextProps {
  children: JSX.Element | JSX.Element[];
}

const WebSocketContext = createContext<IWebSocketContext>(null);

export function WebSocketContextProvider(props: WebSocketContextProps): JSX.Element {
  const { current: webSocketService } = useRef<IWebSocketService>(new WebSocketService());
  const [isConnected, setConnected] = useState<boolean>(false);
  const [messages, setMessges] = useState<WebSocketMessage[]>([]);
  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    if (host) {
      const messageStream = webSocketService.connect(host);

      const ws$subs = messageStream.subscribe(setMessges);

      const ws$connectedSubs = webSocketService.isConnected.subscribe((status: boolean) => {
        setConnected(status);
      });

      return () => {
        ws$subs.unsubscribe();
        ws$connectedSubs.unsubscribe();
        webSocketService.disconnect();
      };
    }
  }, [host]);

  const connect = (url: string) => {
    setHost(url);
  };

  const send = useCallback((message: string) => {
    webSocketService.send(message);
  }, []);

  const value: IWebSocketContext = {
    connect,
    send,
    isConnected,
    messages,
  }

  return (
    <WebSocketContext.Provider value={value}>
      {props.children}
    </WebSocketContext.Provider>
  );
}

WebSocketContext.displayName = 'WebSocketContext';

export default WebSocketContext;
