# Development
Notes and snippets on development

## WebSockets
In order to tests WebSockets a test server is written:

```js
const http = require('http');
const ws = require('ws');

const wss = new ws.Server({noServer: true});

function accept(req, res) {
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket') {
    res.end();
    return;
  }

  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  ws.on('message', function (message) {
    console.log('onmessage', message);
    ws.send(`Received, ${message}!`);
  });
}

if (!module.parent) {
  http.createServer(accept).listen(5200);
} else {
  exports.accept = accept;
}
```

The following is the `package.json` used to power up this websocket:

```json
{
  "name": "wss",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {},
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ws": "^7.2.5"
  }
}
```
