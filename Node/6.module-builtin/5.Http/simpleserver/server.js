const http = require('http');
const fs = require('fs');
const port = 3000;

console.log('서버 기동 시작');
const page = fs.readFileSync('./stopwatch.html',{encoding:'utf-8'});
console.log('페이지 리드 완료');


const server = http.createServer();

server.on('request', (req, res) => {
    console.log('요청이 왔음');
    res.writeHead(200,'You are doing good Request!');
    res.end(page);
    console.log(req);
});

server.on('connection', () => {
    console.log('연결이 되었음');
});

server.on('close', () => {
    console.log('연결이 종료되었음');
});

server.listen(port,()=>{
    console.log(`${port}번 포트에서 요청 대기중`);
});