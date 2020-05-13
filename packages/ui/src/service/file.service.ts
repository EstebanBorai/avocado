import { ipcRenderer } from 'electron-better-ipc';
import { IPCEvents, DownloadFileParams } from 'shared';

export interface IFileService {
  create: (props: DownloadFileParams) => void;
}

class FileService implements IFileService {
  public create({ filename, contents }: DownloadFileParams): void {
    ipcRenderer.send(IPCEvents.CREATE_AND_DOWNLOAD_FILE, {
      filename,
      contents
    });
  }
}

export default FileService;
