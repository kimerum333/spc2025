const express = require('express');
const morgan = require('morgan');

const path = require('path');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));


//파서 성능 최적화? 헤더를 읽고, 헤더의 타입을 본 뒤 필요한 헤더를 로드해라.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());


//미션1 클라이언트가 원하는 자원을 만든다.
app.post('/submit-json', (req, res) => {
    console.log(req.body);
    //    res.status(201).send(); //빈 바디를 보낸다.
    //    res.status(201).send('응'); // end 는 아예 바디 없이 보낸다.
    const reply = {
        result: "success",
        message: "잘 받았음"
    }
    res.json(reply);
})

app.post('/submit-form', (req, res) => {
    console.log(req.body);
    //    res.status(201).send(); //빈 바디를 보낸다.
    //    res.status(201).send('응'); // end 는 아예 바디 없이 보낸다.
    // const reply = {
    //     result: "success",
    //     message: "잘 받았음"
    // }
    res.json(req.body);
})

app.post('/submit-text', (req, res) => {
    console.log(req.body);

    res.json(req.body);
})


app.listen(port, () => {
    console.log('서버온');
})