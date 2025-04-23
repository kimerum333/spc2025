
//웹서버
const express = require('express');
const app = express();
const port = 3000;

const path = require('path')

//로거
const morgan = require('morgan');
const session = require('express-session');

//DB
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('login.db');

//암호화
const bcrypt = require('bcrypt');
const saltRounds = 10; 
async function hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
}
async function comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  }

//미들웨어
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'abcd1234', //세션 데이터 암호화용 대칭키
    resave: false, //변경된게 없을시 재저장할것인가?
    saveUninitialized: true //초기화되지 않은 세션을 저장할건가? (데이터 없는 세션)
}));


//라우터
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
});

app.post('/login', async (req, res) => {
    let { username, password } = req.body;
    //    console.log(req.body);
    //    const user = users.find((u) => { return u.username == username && u.password == password });
//    console.log(username,password);
    const query = `SELECT password FROM users WHERE username = ?`;
    db.get(query,[username], async (err,row)=>{
        console.log(row);
        if(row){
            //console.log(row);
            let hashedPassword = row.password;
            console.log(hashedPassword);
            let isMatch = await bcrypt.compare(password,hashedPassword);
            if(isMatch){
                res.json({ "message": "로그인 성공" });
            }else{
                res.status(401).json({ "message": "로그인 실패" });
            }
        }else{
            console.log('row 없음');
            res.status(401).json({ "message": "로그인 실패" });
        }
    })
});

app.get('/user', (req, res) => {
    const { username, password } = req.session;
    if (username) {
        res.send(`당신은 ${username} 입니다. 비밀번호는 ${password}`)
    } else {
        res.send(`로그아웃상태입니다.`);
    }
});

app.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log('레디');
});

// const plainPassword = 'password1';
// hashPassword(plainPassword).then(hash => {
//   console.log('암호화된 비밀번호:', hash);
// });