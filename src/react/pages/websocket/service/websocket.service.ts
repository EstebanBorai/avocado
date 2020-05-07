import { Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

interface WebSocketMessage {
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

      const closed$ = fromEvent(this.ws, 'close').pipe(map((event: Event) => ({
        code: 'closed'
      })));

      const error$ = fromEvent(this.ws, 'error');

      const message$ = fromEvent(this.ws, 'message');

      const open$ = fromEvent(this.ws, 'open');

      const obs$ = merge(closed$, error$, message$, open$);
    });

  }
}

export default WebSocketService;
