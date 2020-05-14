import * as electron from 'electron';
import { IPCEvents, DownloadFileParams } from 'shared';

export interface IFileService {
  create: (props: DownloadFileParams) => void;
}

class FileService implements IFileService {
  private readonly electron = electron

  public create({ filename, contents }: DownloadFileParams): void {
    this.electron.ipcRenderer.send(IPCEvents.CREATE_AND_DOWNLOAD_FILE, {
      filename,
      contents,
    });
  }
}

export default FileService;
