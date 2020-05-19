import React from 'react';
import WSocket from '../../views/websocket';
import styled from 'styled-components';

const AppMain = styled.div`
  font-family: ${props => props?.theme?.fonts?.body};
  font-size: 16px;
  background-color: ${props => props?.theme?.colors?.snow};
  height: 100vh;
  width: 100vw;
`;

function Main(): JSX.Element {
  return (
    <AppMain>
      <WSocket />
    </AppMain>
  );
}

export default Main;
