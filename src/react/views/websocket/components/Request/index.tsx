import React, { useContext, useState, useCallback } from 'react';
import './request.scss';
import Control from 'components/Control';
import Input from 'components/Input';
import Button from 'components/Button';
import WebSocketContext, { IWebSocketContext } from '../../context/websocket';

const INITIAL_VALUE = 'Hello World';

function Request(): JSX.Element {
  const { send, isConnected } = useContext<IWebSocketContext>(WebSocketContext);
  const [value, setValue] = useState<string>(INITIAL_VALUE);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(value);
  }, [value]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = event.target.value;

    setValue(textValue);
  }, [value]);

  return (
    <Control title="Request">
      <form id="server" onSubmit={handleSubmit}>
        <Input
          id="input"
          type="text"
          value={value}
          label="Message"
          name="url"
          placeholder="Send a message"
          onChange={handleChange}
        />
        <Button
          id="button"
          text="Send"
          type="submit"
          intent="primary"
          disabled={!isConnected}
        />
      </form>
    </Control>
  );
}

export default Request;
