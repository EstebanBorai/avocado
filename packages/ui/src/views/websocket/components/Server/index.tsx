import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Control, { Header } from 'components/Control';
import Input from 'components/Input';
import Button from 'components/Button';
import useWebSocket from 'views/websocket/hooks/use-websocket';

const Form = styled.form`
  width: 100%;
`;

function Server(): JSX.Element {
  const { connect } = useWebSocket();
  const [value, setValue] = useState<string>('');

  const handleSubmit = useCallback((ev: Event): void => {
    ev.preventDefault();

    connect(value);
  }, []);

  return (
    <Control>
      <Header title="Server" />
      <Form>
        <Input
          label="URL"
          type="text"
          name="server"
          value={value}
          placeholder="wss://"
          onChange={setValue}
        />
        <Button text="Connect" type="submit" />
      </Form>
    </Control>
  );
}

export default Server;
