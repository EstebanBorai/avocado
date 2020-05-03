import { webSocket } from 'rxjs/webSocket';

export interface IWebSocketService<T> {
  connect: (url: string) => Promise<WebSocketSubject<T>>;
}

class WebSocketService<T> implements IWebSocketService<T> {
  private subject: <WebSocketSubject<T> | null>;

  constructor() {
    this.socket = null;
  }

  public connect(url: string) {
    const subject = new webSocket(url);

    subject.subscribe(
      msg => console.log(msg),
      err => console.log(err),
      () => console.log('Done');
    );

    this.socket = subject;
    this.socket.subscribe();
  }

  public send(json: string) {
    this.socket.next(json);
  }

  public close() {
    this.socket.complete();
  }

  public error(obj: Object) {
    this.socket.error(obj);
  }
}

export default WebSocketService;
