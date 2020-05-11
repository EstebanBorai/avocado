import { format } from 'url'
import { join } from 'path'

export function baseUrl () {
  const isDev = require('electron-is-dev')
  if (isDev) {
    return 'http://localhost:3000'
  }
  return format({
    pathname: (join(__dirname, '..', '..', 'build', 'ui', 'index.html')),
    protocol: 'file',
    slashes: true
  })
}
