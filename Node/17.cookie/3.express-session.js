const express = require('express');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express();
const port = 3000;


app.use(morgan('dev'));
app.use(express.json());
//app.use(cookieParser());


app.use(session({
    secret : 'abcd1234', //세션 데이터 암호화용 대칭키
    resave : false, //변경된게 없을시 재저장할것인가?
    saveUninitialized: true //초기화되지 않은 세션을 저장할건가? (데이터 없는 세션)
}));

function visitCounter(req,res,next){
    //세션에 비짓 카운트 없으면 0으로 초기화.
    req.session.visitCount = req.session.visitCount || 0;
    //
    req.session.visitCount++;
    next();
}
app.use(visitCounter);

app.get('/', (req,res)=>{
    req.session.ticket = 'spc2025';
    req.session.cart = ['python', 'javascript', 'golang'];
    req.session.username = 'user1';
    res.send(`당신의 방문 횟수는 ${req.session.visitCount}`);
});

app.get('/user', (req,res)=>{
    const yoursession = req.session;
    console.log(yoursession);

    const{username, ticket, cart} = req.session;
    if(username){
        res.send(`당신의 이름은 ${username}, 장바구니에는 ${cart}가 담겨 있네요`);
    }else{
        res.send('로그인하세요.');
    }
});


app.get('/logout', (req,res)=>{
    req.session.destroy();
    res.send('ㅂㅂ');
});

app.get('/readsession', (req,res)=>{
    const yoursession = req.session;
    console.log(yoursession);

    const ticket = req.session.ticket;
    const cart = req.session.cart;

    res.send(`너의 이전정보는 : ${ticket}, ${cart}`)
});





app.listen(port, ()=>{
    console.log('레디');    
})