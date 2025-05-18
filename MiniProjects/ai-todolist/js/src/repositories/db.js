const Database = require('better-sqlite3');
const path = require('path');

// DB 파일 경로 지정 (없으면 자동 생성)
const db = new Database(path.join(__dirname, 'todo.sqlite3'));

// 테이블이 없으면 생성
db.prepare(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0
    )
`).run();

// 모든 할 일 가져오기
function getAllTodos() {
    return db.prepare('SELECT id, text, completed FROM todos').all()
        .map(row => ({
            ...row,
            completed: !!row.completed
        }));
}

// 할 일 추가
function addTodo(text) {
    const stmt = db.prepare('INSERT INTO todos (text, completed) VALUES (?, 0)');
    const info = stmt.run(text);
    return {
        id: info.lastInsertRowid,
        text,
        completed: false
    };
}

// 할 일 토글 (완료/미완료)
function toggleTodo(id) {
    const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    if (!todo) return null;
    const newCompleted = todo.completed ? 0 : 1;
    db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(newCompleted, id);
    return {
        id: todo.id,
        text: todo.text,
        completed: !!newCompleted
    };
}

// 할 일 삭제
function deleteTodo(id) {
    const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    if (!todo) return null;
    db.prepare('DELETE FROM todos WHERE id = ?').run(id);
    return {
        id: todo.id,
        text: todo.text,
        completed: !!todo.completed
    };
}

module.exports = {
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo
};