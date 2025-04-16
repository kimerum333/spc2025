const express = require('express');
const port = 3000;

const app = express();

//

app.get('/',(req,res)=>{
    res.send('hello!');
});


//  /:id 는 익스프레스의 문법, :id 니까 params 의 id 로 오고, :name 이었다면 name 으로 받았을 것.
app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    res.send(`안녕 ${id} 번 유저!`);
});


// 쿼리파라미터는 req.query안에 담겨온다.
// search?keyword=programming&category=javascript
// curl -i "localhost:3000/search?keyword=programming&category=javascript"
app.get('/search',(req,res)=>{
    const keyword = req.query.keyword;
    const category = req.query.category;
    res.send(`키워드 : ${keyword},카테고리 : ${category}`);
});


//
app.listen(port,()=>{
    console.log(`${port}에서 서버 레디!`)
});



