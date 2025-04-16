const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

//로깅 라이브러리 
//개발시 편한 로그 'dev' , 웹서서 'combined' , 커스텀 '메소드:url, status, respnse
app.use(morgan('dev'));

app.get('/',(req,res)=>{
    console.log('헬로우');
});


app.get('user',(req,res)=>{
    console.log('헬로우, 사용자 정보');
});

app.delete('user',(req,res)=>{
    console.log('헬로우, 사용자 정보 삭제');
});



app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`서버 레디 온 ${port}`);
});