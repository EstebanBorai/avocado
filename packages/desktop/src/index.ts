import { BrowserWindow, app } from 'electron'
import * as dotenv from 'dotenv'
import { baseUrl } from './url/base-url/base-url'
import { initEvents } from './events'

dotenv.config()

app.allowRendererProcessReuse = false

app.on('ready', () => {
  const main = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  main.loadURL(baseUrl())
  main.webContents.openDevTools()
  initEvents()
})
