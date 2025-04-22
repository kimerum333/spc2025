const sqlite3 = require('sqlite3');

//디비 세팅
const db = new sqlite3.Database('users.db');

function runQuery(query, params = []){
    return new Promise((resolve,reject)=>{
        db.run(query,params,(err)=>{
            if(err) reject(err);
            else resolve();
        })
    })
}

function getQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

//로긴함수
async function isPasswordCorrect(username, password){
    console.log('using sqlite3');
    let selectQ = `SELECT password FROM users WHERE username = ?`;

    try{
        const result = await getQuery(selectQ,username);
        if(!result) return false;
        return (result.password == password) ? true:false;
    }catch(err){
        console.log(err);
    }
}

module.exports={
    isPasswordCorrect
}

//console.log(login('user1','password1'));

//console.log(login('user1','password2'));
