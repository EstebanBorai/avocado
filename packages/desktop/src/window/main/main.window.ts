import { BrowserWindow, shell } from 'electron'

export function mainWindow () {
  const main = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  main.webContents.on('new-window', function (e, url) {
    e.preventDefault()
    shell.openExternal(url)
  })
  main.webContents.openDevTools()
  return main
}
