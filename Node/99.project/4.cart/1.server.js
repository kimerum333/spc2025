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

app.get('/addCart/:productId',async (req,res)=>{
    //로그인여부 체크
    if(!req.session){
        res.redirect('/product.html');
    }else{
        let reqProdNum = Number(req.params.productId);
        if(!req.session.cart){ //카트 자체가 없음
            req.session.cart = [];
            let itemDetail = await getProductById(reqProdNum);
            req.session.cart.push({...itemDetail, quantity : 1});
            //console.log(req.session.cart);
        }else{ //카트는 있음
            let item = req.session.cart.find((product)=>{return product.id === reqProdNum});
            if(item){ //카트에 해당 아이템이 있음
                //console.log(item);
                item.quantity++;
            }else{  //카트에 해당 아이템이 없음
                let itemDetail = await getProductById(reqProdNum);
                req.session.cart.push({...itemDetail, quantity : 1});
            }    
        }
        console.log('카트상태 : ',req.session.cart);
        res.redirect('/cart.html');
    }
})

app.listen(port, () => {
    console.log('서버 레디');
})
