import React, { useContext, useState, useCallback } from 'react';
import './payload.scss';
import Control, { Header } from 'components/Control';
import Button from 'components/Button';
import TextEditor, { EditorMode } from 'components/TextEditor';
import { faArrowAltCircleDown, faEdit } from '@fortawesome/free-regular-svg-icons';
import WebSocketContext, { IWebSocketContext } from '../../context/websocket';
import { saveDialog } from '../../../../utils/dialog/save-dialog/save.dialog';
import IpcService from '../../../../ipc/ipc.service';
import { IpcEvents } from '../../../../ipc/ipc.events';


const INITIAL_VALUE = 'Hello World';

function Payload(): JSX.Element {
  const { send, isConnected } = useContext<IWebSocketContext>(WebSocketContext);
  const [value, setValue] = useState<string>(INITIAL_VALUE);

  const [currentMode] = useState<EditorMode>('text');

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    send(value);
  }, [value, send]);

  const handleChange = useCallback((nextValue: string): void => {
    setValue(nextValue);
  }, [setValue]);

  const downloadHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const dialog = {
      title: 'Example save dialog',
      path: 'C:/',
      filters: [
        {
          name: 'Javascript object notation',
          extensions: ['json']
        }
      ]
    }
    const filename = await saveDialog(dialog.title, dialog.path, dialog.filters)
    const payload = {
      FILE_NAME: filename,
      FILE_CONTENT: [
        {
          message: 'Russian one'
        }
      ]
    }
    IpcService.send(IpcEvents.CREATE_AND_DOWNLOAD_FILE, payload)
  }

  return (
    <Control id="ws-payload">
      <Header title="Payload">
        <Button text="Plain Text" icon={faEdit} disabled />
        <Button text="Download" icon={faArrowAltCircleDown} onClick={downloadHandler} />
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
