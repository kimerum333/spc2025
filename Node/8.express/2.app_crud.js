const express = require('express');
const port = 3000;

const app = express();

//

app.get('/',(req,res)=>{
    res.send('hello!');
});
app.post('/',(req,res)=>{
    res.send('post이해완료');
});
app.put('/',(req,res)=>{
    res.send('put이해완료');
});
app.delete('/',(req,res)=>{
    res.send('del이해완료');
});


app.get('/user',(req,res)=>{
    res.send('사용자 정보 조회');
});
app.post('/user',(req,res)=>{
    res.send('사용자 가입 완료');
});
app.put('/user',(req,res)=>{
    res.send('사용자 정보 수정 완료');
});
app.delete('/user',(req,res)=>{
    res.send('사용자 정보 삭제 완료');
});


//
app.listen(port,()=>{
    console.log(`${port}에서 서버 레디!`)
})

