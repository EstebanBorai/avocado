const { remote } = window.require('electron')

export async function saveDialog(title: string, defaultPath: string, filters?: any[]): Promise<string | null> {
  const { dialog } = remote
  const window = remote.getCurrentWindow()
  const options = {
    title,
    defaultPath,
    filters
  }
  const { filePath, canceled } = await dialog.showSaveDialog(window, options)
  return canceled ? null : filePath
}
