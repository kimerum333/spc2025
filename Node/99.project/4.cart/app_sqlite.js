const sqlite3 = require('sqlite3');

//디비 세팅
const db = new sqlite3.Database('users.db');

//로긴함수
function isPasswordCorrect(username, password) {
    return new Promise( (resolve,reject)=>{
        let selectQ = `SELECT password FROM users WHERE username = ?`;
        db.get(selectQ, [username], (err,row)=>{
            //console.log(row);
            if(err){
                reject(err);
            }else if(!row){
                resolve(false)
            }else{
                resolve(row.password==password);
            }
        });
    
    });
}

function getAllProducts() {
    return new Promise( (resolve,reject)=>{
        let selectQ = `SELECT * FROM products`;
        db.all(selectQ, (err,row)=>{
            if(err){
                reject(err);
            }else if(!row){
                resolve(false)
            }else{
                resolve(row);
            }
        });
    
    });
}

function getProductById(productId) {
    return new Promise( (resolve,reject)=>{
        let selectQ = `SELECT * FROM products WHERE id = ?`;
        db.get(selectQ, [productId] , (err,row)=>{
            if(err){
                reject(err);
            }else if(!row){
                resolve(false)
            }else{
                resolve(row);
            }
        });
    
    });
}

module.exports = {
    isPasswordCorrect,
    getAllProducts,
    getProductById

}

// async function testLogin(){
//     const result1 = await isPasswordCorrect('user1','password1');
//     const result2 = await isPasswordCorrect('user1','password2');
//     console.log(result1);
//     console.log(result2);
// }

// testLogin();


// async function testGetProducts(){
//     let result = await getAllProducts();
//     console.log(result);
// }

// testGetProducts();

// async function testgetProductById(){
//     let result = await getProductById(1);
//     console.log(result);
// }

// testgetProductById();