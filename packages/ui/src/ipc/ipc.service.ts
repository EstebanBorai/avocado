import { IpcEvents } from './ipc.events';

const { ipcRenderer } = window.require('electron');

export default {
  send(event: IpcEvents, payload?: any) {
    ipcRenderer.send(event, payload);
  },
};
