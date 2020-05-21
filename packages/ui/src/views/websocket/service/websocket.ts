import {
  BehaviorSubject, fromEvent, merge, ReplaySubject,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import StringBytes from '../utils/string-bytes';
import { Console, DataItem, Connection, DataItemKind, ConsoleStream, DataType, makeDataItem } from 'components/Console';

export interface IWebSocketService extends Console {
  stream: ConsoleStream;
  isConnected: BehaviorSubject<boolean>;
  send: (message: string) => void;
  connect: (params: Connection) => Promise<ConsoleStream>;
  disconnect: () => void;
}

class WebSocketService implements IWebSocketService {
  public stream: ConsoleStream;
  public isConnected: BehaviorSubject<boolean>;
  private ws: WebSocket | null;

  constructor() {
    this.ws = null;
    this.stream = null;
    this.isConnected = new BehaviorSubject<boolean>(false);
  }

  public async connect(params: Connection): Promise<ConsoleStream> {
    return new Promise((resolve): void => {
      this.ws = new WebSocket(params.URL);

      const closed$ = fromEvent(this.ws, 'close')
        .pipe(
          tap(() => {
            this.isConnected.next(false);
          }),
          map((event: Event): DataItem => makeDataItem(
              DataItemKind.ConnectionClosed,
              `Closed a connection with ${(event?.target as WebSocket)?.url}`,
              event)));

      const error$ = fromEvent(this.ws, 'error')
        .pipe(
          map((event: Event): DataItem => makeDataItem(
            DataItemKind.Error,
            `An error has ocurred!`,
            event)));

      const message$ = fromEvent(this.ws, 'message')
        .pipe(
          map((event: MessageEvent): DataItem => makeDataItem(
            DataItemKind.Response,
            event?.data,
            event)));

      const send$ = fromEvent(this.ws, 'send')
        .pipe(
          map((event: CustomEvent): DataItem => makeDataItem(
            DataItemKind.Request,
            event?.detail,
            event)));

      const open$ = fromEvent(this.ws, 'open')
        .pipe(
          tap(() => {
            this.isConnected.next(true);
          }),
          map((event: CustomEvent): DataItem => makeDataItem(
            DataItemKind.ConnectionOpened,
            `Opened a connection with ${(event?.target as WebSocket)?.url}`,
            event)));

      this.stream = new ReplaySubject<DataItem>();
      merge(closed$, error$, message$, send$, open$)
        .pipe(
          map((dataItem: DataItem) => {
            if (typeof dataItem?.message === 'string') {
              return dataItem;
            }

            if ((dataItem.message as any) instanceof Blob) {
              const fromBlob = new StringBytes(dataItem.message);

              return {
                ...dataItem,
                message: fromBlob.toString(),
                rawData: dataItem.message,
                dataType: DataType.Blob
              }
            }

            return {
              ...dataItem,
              message: '[Binary Data]'
            };
          })
        ).subscribe(this.stream);

      return resolve(this.stream);
    });
  }

  public disconnect(): void {
    this.ws.close();
  }

  public send(message: string): void {
    const bytes = new StringBytes(message);
    const event = new CustomEvent('send', {
      detail: message,
    });

    this.ws.send(bytes.toArrayBuffer());
    this.ws.dispatchEvent(event);
  }
}

export default WebSocketService;
