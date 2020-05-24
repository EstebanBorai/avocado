import React, { useState } from 'react';
import styled from 'styled-components';
import WebSocketView from 'views/websocket';

const AppMain = styled.div`
  background-color: ${props => props?.theme?.global?.backgroundColor};
  color: ${props => props?.theme?.global?.color};
  font-family: ${props => props?.theme?.fonts?.body};
  font-size: 16px;
  height: calc(100vh - 90px);
  margin: 0;
  padding: 0;
  width: 100%;

  * {
    box-sizing: border-box;
  }
`;

function Main(): JSX.Element {
  return (
    <AppMain>
      <WebSocketView />
    </AppMain>
  );
}

export default Main;
