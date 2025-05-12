import express from 'express';
import morgan from 'morgan';
import path from 'path';

import homeRoutes from './2.routes/homeRoutes.js';
import postRoutes from './2.routes/postRoutes.js';
import postApi from './2.routes/api/postApi.js';
import fileRoutes from './2.routes/fileRoutes.js';


const app = express();

///미들웨어
//로깅
app.use(morgan('dev'));
//파싱
app.use(express.json());
//정적 파일
app.use(express.static(path.join(__dirname,'public')));

//TODO 이후 CSP명세, CORS 필요.



///라우터
//홈
app.use('/', homeRoutes); 

//포스트
app.use('/posts', postRoutes);
app.use('/api/posts', postApi); 

//파일
app.use('/files',fileRoutes);


export default app;