import { ipcMain } from 'electron'
import { DownloadEventParam } from './types/download.event.types'
import { FileService } from '../../services/file/file.service'

export enum DOWNLOAD_EVENTS {
  CREATE_AND_DOWNLOAD_FILE = 'CREATE_AND_DOWNLOAD_FILE'
}

export function downloadEvent () {
  ipcMain.on(DOWNLOAD_EVENTS.CREATE_AND_DOWNLOAD_FILE, (_, data: DownloadEventParam) => {
    FileService.create(data.FILE_NAME, data.FILE_CONTENT)
  })
}
