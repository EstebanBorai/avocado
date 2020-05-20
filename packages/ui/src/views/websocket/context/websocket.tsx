import React, {
  useState, useRef, useEffect, useCallback, createContext,
} from 'react';
import WebSocketService, { IWebSocketService } from '../service/websocket';
import { DataItem, TargetType, ConsoleStream } from 'components/Console';

export interface IWebSocketContext {
  history: DataItem[];
  stream: ConsoleStream;
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
  const [history, setHistory] = useState<DataItem[]>([]);
  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    if (host) {
      webSocketService.connect({
        URL: host,
        targetType: TargetType.WebSocket
      });

      const isConnectedSubs = webSocketService.isConnected.subscribe((value: boolean) => {
        setConnected(value);
      });

      const streamSubs = webSocketService.stream.subscribe((data) => {
        const next = [...history, data];

        setHistory(next);
      });
    
      return () => {
        webSocketService.disconnect();
        isConnectedSubs.unsubscribe();
        streamSubs.unsubscribe();
      }
    }
  }, [host, webSocketService]);

  const connect = (url: string) => {
    setHost(url);
  };

  const send = useCallback((message: string) => {
    webSocketService.send(message);
  }, [webSocketService]);

  const value: IWebSocketContext = {
    history,
    stream: webSocketService.stream,
    isConnected,
    connect,
    send,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {props.children}
    </WebSocketContext.Provider>
  );
}

WebSocketContext.displayName = 'WebSocketContext';

export default WebSocketContext;
