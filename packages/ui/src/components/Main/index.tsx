import React from 'react';
import WSocket from '../../views/websocket';
import Header from '../Header';
import styled from 'styled-components';

const AppMain = styled.div`
  height: 100vh;
  width: 100vw;
`;

function Main(): JSX.Element {
  return (
    <AppMain>
      <Header />
      <main>
        <WSocket />
      </main>
    </AppMain>
  );
}

export default Main;
