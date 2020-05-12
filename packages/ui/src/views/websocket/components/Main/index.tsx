import * as React from 'react';
import './main.scss';
import Server from '../Server';
import Payload from '../Payload';
import Log from '../Log';

const Main = (): JSX.Element => (
  <section id="websocket">
    <div id="request">
      <Server />
      <Payload />
    </div>
    <Log />
  </section>
);

export default Main;
