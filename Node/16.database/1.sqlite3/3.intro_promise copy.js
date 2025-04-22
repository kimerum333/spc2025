const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('test.db');

//promise 로 강제로 감싸기.
(async ()=>{
    await new Promise((resolve,reject)=>{ //pending fullfilled rejected
        db.run('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite!'],(err=>{
            if(err) reject(err);
            else resolve();
        }));
    });    
})();


//each 는 실행결과를 받아온다.

