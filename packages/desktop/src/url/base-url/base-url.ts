import { format } from 'url'
import { join } from 'path'
import { path as root } from 'app-root-path';

export function baseUrl () {
  const isDev = require('electron-is-dev')
  if (isDev) {
    return 'http://localhost:3000'
  }

  // root = '../packages/desktop'
  const UI_CONTENTS = format({
      pathname: (join(root, 'build', 'ui', 'index.html')),
      protocol: 'file',
      slashes: true
    });

  return UI_CONTENTS;
}
