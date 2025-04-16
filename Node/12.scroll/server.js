const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

//보내줄 데이터 정의
const data = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);


//객체
class Page {
    //TODO hasNext = false;
    constructor(page, size) {
        this.page = page;
        this.size = size;
    }
    paginate(data) {
        let startIndex = this.size * (this.page - 1);
        let endIndex = startIndex + this.size;
        return data.slice(startIndex,endIndex);
    }
}


// 미들웨어 체인
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


//리퀘스트 핸들러
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(filePath);
});


app.get('/get-items', (req, res) => {

    const page = new Page(Number(req.query.page), Number(req.query.size));
    const answer = page.paginate(data);

    res.json(answer);
});



//리슨
app.listen(port, () => {
    console.log('서버 레디');
});