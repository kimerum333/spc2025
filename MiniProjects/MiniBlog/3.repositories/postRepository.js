import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('blog.db');

export function insertPost({ title, content, author_id }) {
    const query = `
      INSERT INTO posts (title, content, author_id)
      VALUES (?, ?, ?)
    `;
  
    return new Promise((resolve, reject) => {
      db.run(query, [title, content, author_id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); // insert된 row의 id
        }
      });
    });
  }