import {
  BehaviorSubject, fromEvent, merge, ReplaySubject,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import StringBytes from '../utils/string-bytes';
import { Console, DataItem, Connection, DataItemKind, ConsoleStream } from 'components/Console';

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

  public connect(params: Connection): Promise<ConsoleStream> {
    return new Promise((resolve): void => {
      this.ws = new WebSocket(params.URL);

      const closed$ = fromEvent(this.ws, 'close')
        .pipe(
          tap(() => {
            this.isConnected.next(false);
          }),
          map((event: Event): DataItem => ({
            kind: DataItemKind.ConnectionClosed,
            message: `Closed a connection with ${(event?.target as WebSocket)?.url}`,
            data: event
          })),
        );

      const error$ = fromEvent(this.ws, 'error')
        .pipe(
          map((event: Event): DataItem => ({
            kind: DataItemKind.Error,
            message: `An error has ocurred!`,
            data: event
          })),
        );

      const message$ = fromEvent(this.ws, 'message')
        .pipe(
          map((event: MessageEvent): DataItem => ({
            kind: DataItemKind.Response,
            message: event?.data,
            data: event?.data
          })),
        );

      const send$ = fromEvent(this.ws, 'send')
        .pipe(
          map((event: CustomEvent): DataItem => ({
            kind: DataItemKind.Request,
            message: event?.detail,
            data: event
          })),
        );

      const open$ = fromEvent(this.ws, 'open')
        .pipe(
          tap(() => {
            this.isConnected.next(true);
          }),
          map((event: CustomEvent) => ({
            kind: DataItemKind.ConnectionOpened,
            message: `Opened a connection with ${(event?.target as WebSocket)?.url}`,
            data: event
          })),
        );

      this.stream = new ReplaySubject<DataItem>();
      merge(closed$, error$, message$, send$, open$).subscribe(this.stream);
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
