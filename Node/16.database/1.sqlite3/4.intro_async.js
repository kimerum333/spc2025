const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('test.db');

function runQuery(query, params = []){
    return new Promise((resolve,reject)=>{
        db.run(query,params,(err)=>{
            if(err) reject(err);
            else resolve();
        })
    })
}


//each 는 실행결과를 받아온다.

(async()=>{
    await runQuery('CREATE TABLE IF NOT EXISTS messages (text TEXT)');
    await runQuery('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite!']);
    await runQuery('SELECT * FROM messages', (err,row)=>{
        console.log(row.text);
    })
})();