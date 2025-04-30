// sse-server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // 개발 중에는 CORS 열어둬야 함

// 클라이언트 연결 시
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let counter = 0;

  const interval = setInterval(() => {
    counter++;
    const now = new Date().toISOString();
    res.write(`data: {"time": "${now}", "value": ${Math.random().toFixed(4)}}\n\n`);
  }, 2000);

  // 연결 끊겼을 때 정리
  req.on('close', () => {
    console.log('연결 끊김');
    clearInterval(interval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`SSE server running on http://localhost:${PORT}`);
});
