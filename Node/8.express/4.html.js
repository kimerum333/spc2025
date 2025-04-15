const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// const fs = require('fs');
// const html = fs.readFileSync('./index.html',{encoding:'utf-8'});


// 정적 파일 제공: /image → ./image 폴더
app.use('/image', express.static(path.join(__dirname, 'public/image')));

app.get('/',(req,resp)=>{
    //__dirname : 현재 이 파일이 위치한 경로를 담고 있는 전역 변수.
    const htmlFilePath = path.join(__dirname,'1.imagegallery.html'); //절대경로()
    resp.sendFile(htmlFilePath);    
});

app.listen(port,()=>{
    console.log('서버온');
});
