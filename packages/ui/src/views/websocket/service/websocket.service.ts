import { Observable, BehaviorSubject, fromEvent, merge, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import StringBytes from '../utils/string-bytes'

export enum WebSocketCode {
  Closed = 'closed',
  Error = 'error',
  SentMessage = 'send',
  ReceivedMessage = 'message',
  Open = 'open'
}

export interface WebSocketMessage {
  code: WebSocketCode
  event?: Event | CustomEvent | MessageEvent
  data: string
}

export type WebSocketMessagesSubject = BehaviorSubject<WebSocketMessage[]>

export type WebSocket$ = Observable<WebSocketMessage> | null

export interface IWebSocketService {
  messages: BehaviorSubject<WebSocketMessage[]>
  isConnected: BehaviorSubject<boolean>
  send: (message: string) => void
  connect: (url: string) => WebSocketMessagesSubject
  disconnect: () => void
}

class WebSocketService implements IWebSocketService {
  public messages: WebSocketMessagesSubject
  public isConnected: BehaviorSubject<boolean>
  private webSocket$: WebSocket$
  private ws: WebSocket | null
  private messagesSubscription: Subscription

  constructor () {
    this.ws = null
    this.webSocket$ = null
    this.isConnected = new BehaviorSubject<boolean>(false)
    this.messages = new BehaviorSubject<WebSocketMessage[]>([])
    this.messagesSubscription = null
  }

  public connect (url: string): WebSocketMessagesSubject {
    this.ws = new WebSocket(url)

    const closed$ = fromEvent(this.ws, 'close')
      .pipe(
        tap(() => {
          this.isConnected.next(false)
        }),
        map((event: Event) => ({
          code: WebSocketCode.Closed,
          event
        })
      ))

    const error$ = fromEvent(this.ws, 'error')
      .pipe(
        map((event: Event) => ({
          code: WebSocketCode.Error,
          event
        }))
      )

    const message$ = fromEvent(this.ws, 'message')
      .pipe(
        map((event: MessageEvent) => ({
          code: WebSocketCode.ReceivedMessage,
          event,
          data: event?.data
        }))
      )

    const send$ = fromEvent(this.ws, 'send')
      .pipe(
        map((event: CustomEvent) => ({
          code: WebSocketCode.SentMessage,
          event,
          data: event?.detail
        }))
      )

    const open$ = fromEvent(this.ws, 'open')
      .pipe(
        tap(() => {
          this.isConnected.next(true)
        }),
        map((event: CustomEvent) => ({
          code: WebSocketCode.Open,
          event
        }))
      )

    this.messagesSubscription = merge(closed$, error$, message$, send$, open$).subscribe((message): void => {
      const current = this.messages.getValue()

      this.messages.next([...current, (message as unknown as WebSocketMessage)])
    })

    return this.messages
  }

  public disconnect (): void {
    this.messagesSubscription.unsubscribe()
    this.ws.close()
  }

  public send (message: string): void {
    const bytes = new StringBytes(message)
    const event = new CustomEvent('send', {
      detail: message
    })

    this.ws.send(bytes.toArrayBuffer())
    this.ws.dispatchEvent(event)
  }
}

export default WebSocketService
