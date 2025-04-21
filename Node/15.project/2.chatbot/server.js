const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());


app.post('/api/chat', (req, res) => {
    const question = req.body.question;
    //console.log(question);
    res.json({ answer: question });
})

app.listen(port, () => {
    console.log('서버 레디');
})

//버그1.최근 대화 위치로 자동 스크롤
//미션1. 파이썬 서버로 에커 보내줌.