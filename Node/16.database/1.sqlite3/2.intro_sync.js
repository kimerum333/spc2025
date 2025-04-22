const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('test.db');

//이거 전부 비동기로 실행되는걸 인지해라!

db.run ('CREATE TABLE IF NOT EXISTS messages (text TEXT)',(err)=>{
    console.log('테이블 생성 성공');
    db.run('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite!'],(err=>{
        console.log('삽입 성공 시점');
        db.each('SELECT * FROM messages', (err,row)=>{
            console.log(row.text);
        })
        db.close((err)=>{
            console.log('성공적으로 연결 종료');
        });
    }));
});

//each 는 실행결과를 받아온다.

