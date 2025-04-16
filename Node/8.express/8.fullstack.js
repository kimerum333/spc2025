//익스프레스 가져오기
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

//파싱 라이브러리(json의 경우)
app.use(express.json());
//쿼리스트링 파싱할땐 이거 하면 좋다.
//app.use(express.urlencoded({extended:true}));

//로컬 DB
let users = [];
//숙제 : 시퀀스 변수 없이 리스트만으로 구현해보기.
let sequence = 1;

//정적 파일 제공(html)
app.use(express.static(path.join(__dirname,'public')));

//엔티티
class User {
    constructor(name){
        this.name = name;
        this.id = sequence++;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
}

///엔드 포인트 설정
//메인홈
app.get('/',(req,res)=>{
    console.log('메인 홈');
    const filePath = path.join(__dirname,'public','users.html');
    res.sendFile(filePath);
    //res.json(); => 객체타입으로 리턴할 수 있다. application/json
});

//get
//목록
app.get('/users',(req,res)=>{
    res.send(users);    //text/html
    //res.json(); => 객체타입으로 리턴할 수 있다. application/json
});
//단일
app.get('/users/:id',(req,res)=>{

    const id = Number(req.params.id);
    //Array 의 내장함수
    const user = users.find(u => u.id === id);

    if(user){
        res.send(user);
    }else{
        res.status(404).send('그런 유저는 없습니다.');
    }
});

//post
app.post('/users',(req,res)=>{
    //각 요청에 대해 에러 처리 필수...
    try{
        const user = new User(req.body.name);
        console.log('생성된 유저의 정보 : ',user);
        users.push(user);
        res.status(201).send('유저가 잘 생성되었습니다.');
    }catch(err){
        res.status(500).send('알 수 없는 에러');
    }
});

//update
app.put('/users',(req,res)=>{
    const id = req.body.id;
    console.log('put요청 들어옴',req.body);
    //Array 의 내장함수
    let user = users.find(u => u.id === id);
    if(!user){
        res.status(404).send('그런 유저는 없습니다.');
        return;
    }
    user.name = req.body.name;
    user.updatedAt = Date.now();

    res.send(user);
});

//delete
app.delete('/users/:id',(req,res)=>{
    try{
        const id = Number(req.params.id);
        let userindex = users.findIndex( u=>u.id===id);
        if(userindex==-1){
            res.status(404).send('그런 유저는 없습니다.');
        }else{
            users.splice(userindex,1);
            res.status(204).send('잘 지워졌습니다.');
        }    
    }catch(err){
        
    }
});


app.listen(3000,(err)=>{
    console.log(`port opend on ${port}`);
    console.log(err);
});
