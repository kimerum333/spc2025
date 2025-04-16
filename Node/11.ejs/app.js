const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//익스프레스가 기본 지원하는 템플릿 엔진
app.set('view engine','ejs'); //views 라는 폴더 안의 *.ejs 파일을 찾는다.

// app.get('/',(req,res)=>{
//     const filePath = path.join(__dirname,'index.html');
//     res.sendFile(filePath);
// });

app.get('/',(req,res)=>{
    res.render('index', {title:'나의타이틀',message:'ejs 학습중'}); //

    //const filePath = path.join(__dirname,'index.html');
    //res.sendFile(filePath);
});

app.listen(port,(err)=>{
    console.log('서버 레디');
})