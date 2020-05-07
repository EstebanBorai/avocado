import React, { useState, useRef, useEffect, useCallback } from 'react';
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

const WebSocketContext = React.createContext<IWebSocketContext>(null);

export function WebSocketContextProvider(props: WebSocketContextProps): JSX.Element {
  const { current: webSocketService } = useRef<IWebSocketService>(new WebSocketService());
  const [isConnected, setConnected] = useState<boolean>(false);
  const [messages, setMessges] = useState<WebSocketMessage[]>([]);
  const [host, setHost] = useState<string | null>(null);

  const handleMessage = (message: WebSocketMessage) => {
    const next: WebSocketMessage[] = [...messages];
    delete message.event;
    console.log(next, message);
    next.push({...message});
    setMessges(next);
  };

  useEffect(() => {
    if (host) {
      const ws$ = webSocketService.connect(host);

      const ws$subs = ws$.subscribe(handleMessage);

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

  const send = React.useCallback((message: string) => {
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
