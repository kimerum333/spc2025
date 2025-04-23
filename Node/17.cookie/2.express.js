const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const port = 3000;
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.cookie('your_number', '1234');
    res.send('은행방문, 접수완료');
});

app.get('/readcookie', (req,res)=>{
    const cookie = req.cookies;
    console.log('가져온 쿠키는: ', cookie);
    res.send(`니가가져온쿠키' ${JSON.stringify(cookie)}`);
});



app.listen(port, ()=>{
    console.log('레디');    
})