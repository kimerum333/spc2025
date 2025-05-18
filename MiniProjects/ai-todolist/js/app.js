const express = require('express');
const morgan = require('morgan');
const path = require('path');

const todoRoutes = require('./src/routes/todo-routes');
const aiRoutes = require('./src/routes/ai-routes');

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(todoRoutes)
app.use(todoRoutes)

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});