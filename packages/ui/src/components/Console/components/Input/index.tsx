import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import ActionSelect from './ActionSelect';

const Container = styled.div`
  border-top: 1px solid ${props => props?.theme?.colors?.gray};
  grid-column: 1 / 1;
  grid-row: 2 / 2;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 150px;
  padding: 0;
  height: 100%;
  width: 100%;
`;

const TextField = styled.input`
  background-color: ${props => props.theme.global.backgroundColor};
  border: none;
  box-sizing: border-box;
  font-family: ${props => props.theme.fonts.monospace};
  grid-column: 1 / 1;
  height: 100%;
  outline: none;
  padding: 0 1rem;
  width: 100%;
`;

interface InputProps {
  isConnected: boolean;
  connect: (url: any) => void;
  send: (text: string) => void;
}

function Input({ connect, send, isConnected }: InputProps): JSX.Element {
  const [value, setValue] = useState<string>('');
  const current = 'Enter URL';
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  }, []);

  const handleConnect = useCallback((): void => {
    connect(value);
  }, [value]);

  const handleSend = useCallback((): void => {
    send(value);
  }, [value]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextField
          name="console-input"
          placeholder={current}
          value={value}
          onChange={handleChange}
        />
        <ActionSelect
          isConnected={isConnected}
          onConnect={handleConnect}
          onSend={handleSend}
        />
      </Form>
    </Container>
  );
}

export default Input;
