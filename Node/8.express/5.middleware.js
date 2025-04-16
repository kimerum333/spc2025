const express = require('express');
const app = express();
const path = require('path');
const port = 3000;


app.use('/image', express.static(path.join(__dirname, 'public/image')));

///스프링의 필터 같은 느낌
function myLog1(req,res,next){
    //인증된 사용자만 관리자페이지로 접근 가능하도록...
    console.log(`MyLog: ${req.method},${req.url}`)
    req.requestTime = Date.now(); //epoch; 1970년 1월 1일 00시 00분 기준으로 몇초 흘렀는가.
    next();
}

function myLog2(req,res,next){
    //인증된 사용자만 관리자페이지로 접근 가능하도록...
    console.log(`MyLog: ${req.method},${req.url}, 2`)
    console.log(req.myData);
    next();
}


app.use(myLog1);
app.use(myLog2);



app.get('/',(req,resp)=>{
    const htmlFilePath = path.join(__dirname,'1.imagegallery.html'); 
    const date = new Date(req.requestTime);
    console.log(`요청시간: ${date.toLocaleString()}`);
    resp.sendFile(htmlFilePath);    
});

app.listen(port,()=>{
    console.log('서버온');
});
