const express = require('express');
const morgan = require('morgan');
const router = express.router();

const app = express();
const port = 3000;

const userRouter = require('./router/userRouter');
const productRouter = require('./router/userRouter');
const mainRouter = require('./router/mainRouter');

app.use(morgan('dev'));

app.get('/',(req,res)=>{
    console.log('헬로우');
});


app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/main',mainRouter);



app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`서버 레디 온 ${port}`);
});