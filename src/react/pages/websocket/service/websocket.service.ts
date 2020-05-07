import { Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

enum WebSocketCode {
  Closed = 'closed',
  Error = 'error',
  Message = 'message',
  Open = 'open'
}

interface WebSocketMessage {
  code: WebSocketCode;
  data: string;
}

type WebSocket$ = Observable<WebSocketMessage> | null;

interface IWebSocketService {
  webSocket$: WebSocket$; 
  connect: (url: string) => Promise<void>;
}

class WebSocketService implements IWebSocketService {
  public webSocket$;
  private ws: WebSocket | null;

  constructor() {
    this.ws = null;
    this.webSocket$ = null;
  }

  public connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);

      const closed$ = fromEvent(this.ws, 'close')
        .pipe(
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
          map((event: Event) => ({
            code: WebSocketCode.Message,
            event
          }))
        );

      const open$ = fromEvent(this.ws, 'open')
        .pipe(
          map((event: Event) => ({
            code: WebSocketCode.Open,
            event
          }))
        );

      const obs$ = merge(closed$, error$, message$, open$);

      this.webSocket$ = obs$;
      return resolve();
    });
  }
}

export default WebSocketService;
