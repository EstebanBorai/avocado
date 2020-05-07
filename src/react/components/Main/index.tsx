import * as React from 'react';
import './main.scss';
import RequestMenu from '../RequestMenu';
import WSocket from '../../views/websocket';
import Header from '../Header';

function Main(): JSX.Element {
  return (
    <div id="app-main">
      <Header />
      <main>
        <WSocket />
      </main>
      <RequestMenu />
    </div>
  );
}

export default Main;
