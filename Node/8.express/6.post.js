const express = require('express');
const app = express();
const port = 3000;

let users = {};

//옛날 버전은 이렇게 바디파서라는걸 임포트해서 썼지만...
//const bodyParser = require('body-parser');

//요즘은 익스프레스가 바디파서를 json이란 이름으로 내장했다.
app.use(express.json()); //얘는 json 을 req.body 에 담아줌;


app.get('/user',(req,resp)=>{
    resp.send(users);    
});

app.post('/user',(req,resp)=>{
    //${}로 오브젝트 찍으면 오브젝트로만 표기. , 로 따로 구분해서 찍으면 오브젝트.투스트링 호출.

    console.log(`유저명은 : ${req.body.name}`)
    const id = Date.now();
    users[id] = req.body.name;

    resp.send('성공');    
});


app.listen(port,()=>{
    console.log(`서버 온 on ${port} 번`);
});
