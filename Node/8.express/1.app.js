const express = require('express');

const app = express();
const port = 3000;
//라우터를 만드는 과정
app.get('/',(req,res)=>{
    //익스프레스의 send 는 기본 헤드와 바디를 잘 만들어준다.
    res.send('Hello, express!');
});


app.get('/user',(req,res)=>{
    //익스프레스의 send 는 기본 헤드와 바디를 잘 만들어준다.
    res.send('Hello, user!');
});

app.listen(port,()=>{
    console.log(`${port}번 포트에서 기다림`);
});

