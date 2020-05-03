import { BehaviorSubject } from 'rxjs';
import StringBytes from '../utils/string-bytes';

export type WebSocketMessage = MessageEvent | string | null;

export type WebSocketError = { message: string } | null;

export type MessageSubject = BehaviorSubject<WebSocketMessage>;

export type ErrorSubject = BehaviorSubject<WebSocketError>;

export interface IWebSocketService {
  messageSubject: MessageSubject;
  errorSubject: ErrorSubject;
  connect: (url: string) => void;
  send: (message: string) => void;
}

class WebSocketService implements IWebSocketService {
  private socket: WebSocket;
  private messages: MessageSubject;
  private error: ErrorSubject;
  private isOpen: BehaviorSubject<boolean>;

  constructor() {
    this.socket = null;
    this.messages = new BehaviorSubject<null>(null);
    this.isOpen = new BehaviorSubject<boolean>(false);
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

    this.socket.onopen = (ev: Event) => {
      this.isOpen.next(true);
    }

    this.socket.onmessage = (ev: MessageEvent) => {
      this.messages.next(ev);
    }

    this.socket.onclose = (ev: CloseEvent) => {
      if (ev.wasClean) {
        // Closed Gracefully
        this.messages.next(JSON.stringify({ code: ev.code, reason: ev.reason }));
      } else {
        this.error.next({ message: 'Connection closed' });
      }
    }
  }

  public send(message: string) {
    const raw = JSON.stringify({ message });

    const stringBytes = new StringBytes(raw);

    this.socket.send(stringBytes.toArrayBuffer());
  }
}

export default WebSocketService;
