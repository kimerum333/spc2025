// db.js
import sqlite3 from 'sqlite3';

// 실제 실행 로그 확인.
sqlite3.verbose(); 

const db = new sqlite3.Database('blog.db', (err) => {
  if (err) {
    console.error('❌ DB 연결 실패:', err.message);
  } else {
    console.log('✅ DB 연결 성공');
    db.run('PRAGMA foreign_keys = ON');
  }
});

export default db;
