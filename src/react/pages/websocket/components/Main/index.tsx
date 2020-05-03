import * as React from 'react';
import './main.scss';
import Server from '../Server';
import Request from '../Request';
import Log from '../Log';
import WebSocketService from '../../service/websocket.service';

function Main(): JSX.Element {
  const { current: { service } } = React.useRef<IWebSocketService<any>>(new WebSocketService());

  return (
    <section id="websocket">
      <Server />
      <Request />
      <Log />
    </section>
  );
}

export default Main;
