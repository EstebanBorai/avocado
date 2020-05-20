import React from 'react';
import WSocket from '../../views/websocket';
import styled from 'styled-components';

const AppMain = styled.div`
  background-color: ${props => props?.theme?.global?.backgroundColor};
  color: ${props => props?.theme?.global?.color};
  font-family: ${props => props?.theme?.fonts?.body};
  font-size: 16px;
  height: 100vh;
  margin: 0;
  padding: 0;
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
