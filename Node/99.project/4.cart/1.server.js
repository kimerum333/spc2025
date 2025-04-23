const express = require('express');
const morgan = require('morgan');
const { isPasswordCorrect,getAllProducts,getProductById } = require('./app_sqlite');
const session = require('express-session');
const path = require('path');


//익스프레스 세팅
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({
    secret: 'my-beautiful-session-key',
    resave: true,
    saveUninitialized: false
}));

app.get('/home',(req,res)=>{
    res.redirect('/');
})

app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let login = await isPasswordCorrect(username, password);
    if (login) {
        req.session.username = username;
        res.send(`안녕하세요 ${username} 님.`);
    } else {
        res.status(401).send('로그인실패');
    }
});



app.get('/product', (req,res)=>{
    res.redirect('/product.html');
});

app.get('/api/getProducts', async (req,res)=>{
    let products = await getAllProducts();
    console.log(products);
    return res.json( { products } );
});

app.get('addCart/:productId',(req,res)=>{
    if(!req.session){
        res.redirect('/product.html');
    }else{
        let cart = req.session.cart || [];
        
    }
})

app.listen(port, () => {
    console.log('서버 레디');
})
