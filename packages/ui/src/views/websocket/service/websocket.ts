import makeArrBuffStr from 'arrbuffstr';
import {
  BehaviorSubject, fromEvent, merge, ReplaySubject,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Console, DataItem, Connection, DataItemKind, ConsoleStream, DataType, makeDataItem } from 'components/Console';

export interface IWebSocketService extends Console {
  stream: ConsoleStream;
  isConnected: BehaviorSubject<boolean>;
  send: (message: string) => void;
  connect: (params: Connection) => Promise<ConsoleStream>;
  disconnect: () => void;
}

/**
 * CloseEvent Code
 * 
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
 */
enum CloseEventCode {
  ClosedGracefully = 1000,
  GoingAway = 1001,
  ProtocolError = 1002,
  UnsupportedData = 1003,
  ClosedError = 1006,
  InvalidFramePayloadData = 1007,
  PolicyViolation = 1008,
  TooLongMessage = 1009,
  MissingExtension = 1010,
  InternalError = 1011,
  ServiceReset = 1012,
  RetryLater = 1013,
  BadGateway = 1014,
  TLSHandshake = 1015
}

function messageFromCloseEvent(event: CloseEvent): string {
  switch (event?.code) {
    case CloseEventCode.ClosedGracefully:
      return `Connection with ${(event?.target as WebSocket)?.url} closed gracefully.`;
    case CloseEventCode.GoingAway:
      return 'The endpoint is gone.';
    case CloseEventCode.ProtocolError:
      return 'The endpoint is terminating the connection due to a protocol error.';
    case CloseEventCode.UnsupportedData:
      return 'Received unsuported data. Connection closed.';
    case CloseEventCode.ClosedError:
      return 'Closed with error. Error is reserved';
    default:
      return `Unknown reason, event code: ${event?.code}`;
  }
}

class WebSocketService implements IWebSocketService {
  public stream: ConsoleStream;
  public isConnected: BehaviorSubject<boolean>;
  private ws: WebSocket | null;
  private arrBuffStr: any;

  constructor() {
    this.ws = null;
    this.stream = new ReplaySubject<DataItem>();
    this.isConnected = new BehaviorSubject<boolean>(false);
    this.arrBuffStr = makeArrBuffStr();
  }

  public async connect(params: Connection): Promise<ConsoleStream> {
    return new Promise((resolve, reject): void => {
      try {
        this.ws = new WebSocket(params.URL);

        const closed$ = fromEvent(this.ws, 'close')
          .pipe(
            tap(() => {
              this.isConnected.next(false);
            }),
            map((event: CloseEvent): DataItem => {
              return makeDataItem(
                DataItemKind.ConnectionClosed,
                messageFromCloseEvent(event),
                event);
            }));

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

        merge(closed$, error$, message$, send$, open$)
          .pipe(
            map((dataItem: DataItem) => {
              if (typeof dataItem?.message === 'string') {
                return dataItem;
              }

              if ((dataItem.message as any) instanceof Blob) {
                return {
                  ...dataItem,
                  message: this.arrBuffStr.toString(dataItem.message),
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
      } catch (error) {
        if (error instanceof DOMException) {
          this.stream.next(makeDataItem(
            DataItemKind.Error,
            error.message,
            error
          ));

          return reject();
        }

        this.stream.next(makeDataItem(
          DataItemKind.Error,
          error?.message || 'An unknown error has ocurred',
          error
        ));
      }
    });
  }

  public disconnect(): void {
    this.ws.close();
  }

  public send(message: string): void {
    const event = new CustomEvent('send', {
      detail: message,
    });

    this.ws.send(this.arrBuffStr.toArrayBuffer(message));
    this.ws.dispatchEvent(event);
  }
}

export default WebSocketService;
