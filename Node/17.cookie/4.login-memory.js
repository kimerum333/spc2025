const express = require('express');
const morgan = require('morgan');
const path = require('path')
const session = require('express-session');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'abcd1234', //세션 데이터 암호화용 대칭키
    resave: false, //변경된게 없을시 재저장할것인가?
    saveUninitialized: true //초기화되지 않은 세션을 저장할건가? (데이터 없는 세션)
}));

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
]

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = users.find((u) => { return u.username == username && u.password == password });
    if (user) {
        req.session.username = username;
        req.session.password = password;
        res.json({ "message": "로그인 성공" });
    } else {
        res.status(401).json({ "message": "로그인 실패" });
    }
});

app.get('/user', (req, res) => {
    const { username, password } = req.session;
    if(username){
        res.send(`당신은 ${username} 입니다. 비밀번호는 ${password}`)
    }else{
        res.send(`로그아웃상태입니다.`);
    }
});

app.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy();
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log('레디');
})