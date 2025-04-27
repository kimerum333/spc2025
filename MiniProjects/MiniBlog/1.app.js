import express from 'express';
import morgan from 'morgan';

import homeRoutes from './2.routes/homeRoutes.js';
import postRoutes from './2.routes/postRoutes.js';
import postApi from './2.routes/api/postApi.js';


const app = express();

//미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

//TODO 이후 CSP명세 필요.



///라우터
//홈
app.use('/', homeRoutes); 

//포스트
app.use('/posts', postRoutes);
app.use('/api/posts', postApi); 



export default app;