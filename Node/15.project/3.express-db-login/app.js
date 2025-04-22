const express = require('express');
const morgan = require('morgan');
const { isPasswordCorrect } = require('./app_sqlite');


//익스프레스 세팅
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    //console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;

    // console.log(username);
    // console.log(password);

    if (await isPasswordCorrect(username, password)) {
        //console.log('로그인성공');
        res.send('로그인성공');
    } else {
        //console.log('로그인실패');
        res.send('로그인실패');
    }
});

app.listen(port, () => {
    console.log('서버 레디');
})
