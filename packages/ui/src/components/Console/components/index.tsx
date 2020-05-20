import React, { useCallback } from 'react';
import { Observable } from 'rxjs';
import styled from 'styled-components';
import Input from './Input';
import Output from './Output';
import { ConsoleStream } from '../typings/console';

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: calc(100vh - 3rem) 3rem;

  * {
    font-size: .95rem;
  }
`;

interface ConsoleProps {
  stream: ConsoleStream;
  isConnected: boolean;
  connect: (url: string) => void;
  send: (message: string) => void;
}

function Console({ stream, connect, send, isConnected }: ConsoleProps): JSX.Element {
  return (
    <Container>
      <Output stream={stream} isConnected={isConnected} />
      <Input connect={connect} send={send} isConnected={isConnected} />
    </Container>
  );
}

export default Console;
