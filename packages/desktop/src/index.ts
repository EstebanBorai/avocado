import { BrowserWindow, app } from 'electron'
import * as dotenv from 'dotenv'
import { baseUrl } from './url/base-url/base-url'
import { initEvents } from './events'
import { mainWindow } from './window/main/main.window'

dotenv.config()

app.allowRendererProcessReuse = false

app.on('ready', () => {
  const main = mainWindow()
  main.loadURL(baseUrl())
  initEvents()
})
