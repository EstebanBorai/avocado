import { BehaviorSubject, ReplaySubject } from 'rxjs';

export type ConsoleStream = ReplaySubject<DataItem>;

export enum DataType {
  String = 'string',
  Blob = 'blob',
  Unknown = 'unknown'
}

export enum TargetType {
  WebSocket = 'websocket'
}

export enum DataItemKind {
  Error = 'error',
  Info = 'info',
  Request = 'request',
  Response = 'response',
  Warning = 'warning',
  ConnectionClosed = 'close',
  ConnectionOpened = 'open'
}

export interface Connection {
  URL: string;
  targetType: TargetType;
}

export interface DataItem {
  kind: DataItemKind;
  message: string;
  data: any;
  dataType: DataType;
  rawData: any;
}

export interface Console {
  isConnected: BehaviorSubject<boolean>;
  stream: ConsoleStream;
  connect: (params: Connection) => Promise<any>;
  disconnect: () => any;
}
