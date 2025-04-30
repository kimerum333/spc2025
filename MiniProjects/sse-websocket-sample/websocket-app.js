// express-ws-server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app); // HTTP 서버 생성
const wss = new WebSocket.Server({ server }); // WebSocket을 그 위에 얹음

app.get('/', (req, res) => {
  res.send('🧪 Express + WebSocket!');
});

wss.on('connection', (ws) => {
  console.log('✅ WebSocket 연결됨');
  ws.send('👋 Hello from WebSocket over Express!');
});

server.listen(3000, () => {
  console.log('🚀 서버 실행 중: http://localhost:3000');
});
