import useWebSocket from './use-websocket';

const useIsConnected = (): boolean => {
  const { isConnected } = useWebSocket();

  return isConnected;
};

export default useIsConnected;
