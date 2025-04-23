const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');

const users = [
    {username : 'username1', password : 'password1'},
    {username : 'username2', password : 'password2'},
    {username : 'username3', password : 'password3'}
]

const db = new sqlite3.Database('login.db');

async function insertUsers(){
    for (const user of users){
        const hash = await bcrypt.hash(user.password,10);
        db.run('INSERT INTO users (username, password) VALUES(?,?)',
            [user.username,hash],
            (err)=>{
                console.log('등록 성공')
        })
    }
};

insertUsers();