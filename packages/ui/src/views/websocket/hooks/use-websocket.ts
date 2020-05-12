import { useContext } from 'react';
import WebSocketContext, { IWebSocketContext } from '../context/websocket';

const useWebSocket = (): IWebSocketContext => {
  const context = useContext<IWebSocketContext>(WebSocketContext);

  return context;
};

export default useWebSocket;
