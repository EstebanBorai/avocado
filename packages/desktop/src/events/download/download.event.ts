import { ipcMain } from 'electron'
import { FileService } from '../../services/file/file.service'
import { IPCEvents, DownloadFileParams } from 'shared'

export function downloadEvent () {
  ipcMain.on(IPCEvents.CREATE_AND_DOWNLOAD_FILE, (_, data: DownloadFileParams) => {
    FileService.create(data.filename, data.contents)
  })
}
