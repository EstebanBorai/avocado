import { BehaviorSubject, Observable, Observer, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import StringBytes from '../utils/string-bytes';

export type WebSocketError = { message: string } | null;

export type MessageSubject = Observable<WebSocketMessage>;

export type WebSocketConnected = BehaviorSubject<boolean>;

export type ErrorSubject = BehaviorSubject<WebSocketError>;

export interface WebSocketMessage {
  code?: number;
  data?: string;
  reason?: string;
};

export interface IWebSocketService {
  messageSubject: MessageSubject;
  errorSubject: ErrorSubject;
  isConnected: WebSocketConnected;
  subscription: Subscription;
  connect: (url: string) => void;
  send: (message: string) => void;
}

class WebSocketService implements IWebSocketService {
  private socket: WebSocket;
  private messages: MessageSubject;
  private error: ErrorSubject;
  public isConnected: WebSocketConnected;

  constructor() {
    this.socket = null;
    this.messages = new Observable<null>(null);
    this.isConnected = new BehaviorSubject<boolean>(false);
    this.error = new BehaviorSubject<WebSocketError>(null);
  }

  get messageSubject(): MessageSubject {
    return this.messages;
  }

  get errorSubject(): ErrorSubject {
    return this.error;
  }

  public connect(url: string) {
    this.socket = new WebSocket(url);
    this.subscription = new Subscription();

    const subject = this.makeWebSocketSubject();

    this.socket.onopen = (ev: Event) => {
      this.isConnected.next(true);
    }
  }

  public send(message: string) {
    const raw = JSON.stringify({ message });

    const stringBytes = new StringBytes(raw);

    this.socket.send(stringBytes.toArrayBuffer());
  }

  private makeWebSocketSubject(): Subject<MessageEvent> {
    const ws$ = Observable.create((observer: Observer<any>) => {
      this.socket.onmessage = observer.next;

      this.socket.onerror = observer.error;

      this.socket.onopen = () => {
        observer.next(() => this.isConnected.next(true));
      };

      this.socket.onclose = () => {
        observer.complete();
        this.isConnected.next(false);
      }
    });

    return Subject.create(ws$);
  }
}

export default WebSocketService;
