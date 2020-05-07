import { Observable, BehaviorSubject, fromEvent, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import StringBytes from '../utils/string-bytes';

export enum WebSocketCode {
  Closed = 'closed',
  Error = 'error',
  SentMessage = 'send',
  ReceivedMessage = 'message',
  Open = 'open'
}

export interface WebSocketMessage {
  code: WebSocketCode;
  event?: Event | CustomEvent | MessageEvent;
  data: string;
}

export type WebSocket$ = Observable<WebSocketMessage> | null;

export interface IWebSocketService {
  isConnected: BehaviorSubject<boolean>;
  send: (message: string) => void;
  connect: (url: string) => WebSocket$;
  disconnect: () => void;
}

class WebSocketService implements IWebSocketService {
  public isConnected: BehaviorSubject<boolean>;
  private webSocket$: WebSocket$;
  private ws: WebSocket | null;

  constructor() {
    this.ws = null;
    this.webSocket$ = null;
    this.isConnected = new BehaviorSubject<boolean>(false);
  }

  public connect(url: string): WebSocket$ {
    this.ws = new WebSocket(url);

    const closed$ = fromEvent(this.ws, 'close')
      .pipe(
        tap(() => {
          this.isConnected.next(false);
        }),
        map((event: Event) => ({
          code: WebSocketCode.Closed,
          event
        })
      ));

    const error$ = fromEvent(this.ws, 'error')
      .pipe(
        map((event: Event) => ({
          code: WebSocketCode.Error,
          event
        }))
      );

    const message$ = fromEvent(this.ws, 'message')
      .pipe(
        map((event: MessageEvent) => ({
          code: WebSocketCode.ReceivedMessage,
          event,
          data: event?.data
        }))
      );

    const send$ = fromEvent(this.ws, 'send')
      .pipe(
        map((event: CustomEvent) => ({
          code: WebSocketCode.SentMessage,
          event,
          data: event?.detail
        }))
      );

    const open$ = fromEvent(this.ws, 'open')
      .pipe(
        tap(() => {
          this.isConnected.next(true);
        }),
        map((event: CustomEvent) => ({
          code: WebSocketCode.Open,
          event,
        }))
      );

    const obs$ = merge(closed$, error$, message$, send$, open$);

    this.webSocket$ = obs$ as unknown as WebSocket$;

    return this.webSocket$;
  }

  public disconnect(): void {
    this.ws.close();
  }

  public send(message: string): void {
    const bytes = new StringBytes(message);
    const event = new CustomEvent('send', {
      detail: message
    });

    this.ws.send(bytes.toArrayBuffer());
    this.ws.dispatchEvent(event);
  }
}

export default WebSocketService;
