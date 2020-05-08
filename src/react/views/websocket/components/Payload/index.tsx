import React, { useContext, useState, useCallback } from 'react';
import './payload.scss';
import Control, { Header } from 'components/Control';
import Input from 'components/Input';
import Button from 'components/Button';
import WebSocketContext, { IWebSocketContext } from '../../context/websocket';
import PayloadType from './PayloadType';
import TextEditor from 'components/TextEditor';
import { EditorMode } from 'components/TextEditor';

const INITIAL_VALUE = 'Hello World';

function Payload(): JSX.Element {
  const { send, isConnected } = useContext<IWebSocketContext>(WebSocketContext);
  const [value, setValue] = useState<string>(INITIAL_VALUE);

  const [currentMode, setMode] = useState<EditorMode>('text');

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(value);
  }, [value]);

  const handleChange = useCallback((value: string, event?: any) => {
    setValue(value);
  }, [value]);

  return (
    <Control id="ws-payload">
      <Header title="Payload">
        <PayloadType />
      </Header>
      <form id="payload-form" onSubmit={handleSubmit}>
        <TextEditor mode={currentMode} value={value} onChange={handleChange} />
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

export default Payload;
