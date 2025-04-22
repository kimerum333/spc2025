const sqlite = require('better-sqlite3');

const db = sqlite('test.db');
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`);

const allusers = db.prepare('SELECT * FROM users');
const allusers_result = allusers.all();
console. log('조회된 사용자: ', allusers_result);

const newuser = {
    username : 'user1',
    email : 'user1@example.com'
}

const insert = db.prepare('INSERT INTO users (username, email) VALUES (?,?)');
insert.run(newuser.username, newuser.email);

const allusers2 = db.prepare('SELECT * FROM users');
const allusers_result2 = allusers2.all();
console. log('조회된 사용자: ', allusers_result2);

const updateuser = {
    id:1,
    username:'user001',
    email:'user001@sample.com'
}

const update = db.prepare('UPDATE users SET username=?, email=? WHERE id=?');
update.run(updateuser.username,updateuser.email, updateuser.id);

const allusers3 = db.prepare('SELECT * FROM users');
const allusers_result3 = allusers3.all();
console. log('조회된 사용자: ', allusers_result3);

const deleteUser = {
    id:2
};

const deleteQ = db.prepare('DELETE FROM users WHERE id=?');
deleteQ.run(deleteUser.id);

db.close();