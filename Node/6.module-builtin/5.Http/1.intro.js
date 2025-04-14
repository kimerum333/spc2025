const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('요청이 왔음');
    res.writeHead(200);
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        body{
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
            align-items: center;
        }
        button{
            padding: 10px 20px;
            font-size: 18px;
            margin-bottom: 20px;
        }
        #colorCode{
            font-size: 36px;
            font-weight: Bold;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <button onclick="changeBGColorRandom()">랜덤색상 배경변경(#)</button>
    <div id="colorCode">칼라코드</div>
    <script>
        //랜덤색상 
        function changeBGColorRandom(){
            const RGB =  Math.floor(Math.random() * 256*256*256).toString(16).padStart(6,'0');
            document.body.style.backgroundColor = "#"+RGB;
            document.getElementById('colorCode').textContent = "#"+RGB;
        }
        document.addEventListener('keydown',function(){
            changeBGColorRandom();
        })
    </script>
</body>
</html>`);
});

server.on('connection', () => {
    console.log('연결이 되었음');
});

server.on('close', () => {
    console.log('연결이 종료되었음');
});

server.listen(3000);