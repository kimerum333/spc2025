const Database = require('better-sqlite3');
// const db = new Database('./chatbot.db');
const db = new Database(':memory:');

// DB 초기화
db.exec(`
    CREATE TABLE IF NOT EXISTS chat_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS chat_pairs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER NOT NULL,
        turn_index INTEGER NOT NULL,
        user_message TEXT NOT NULL,
        assistant_reply TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
    );
    `);

function createNewSession() {
    const stmt = db.prepare('INSERT INTO chat_sessions DEFAULT VALUES');
    const result = stmt.run();
    return result.lastInsertRowid;
}

function getTurnIndex(sessionId) {
    const stmt = db.prepare('SELECT COUNT(*) AS count FROM chat_pairs WHERE session_id = ?');
    const result = stmt.get(sessionId);
    return result.count + 1;
}

function insertUserMessage(sessionId, turnIndex, userMessage) {
    const stmt = db.prepare(`
        INSERT INTO chat_pairs (session_id, turn_index, user_message)
        VALUES (?, ?, ?)
    `);
    stmt.run(sessionId, turnIndex, userMessage);
}

function updateAssistantReply(sessionId, turnIndex, reply) {
    const stmt = db.prepare(`
        UPDATE chat_pairs
        SET assistant_reply = ?
        WHERE session_id = ? AND turn_index = ?
    `);
    stmt.run(reply, sessionId, turnIndex);
}

function buildMemory(sessionId) {
    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' }
    ];
    const stmt = db.prepare(`
        SELECT user_message, assistant_reply
        FROM chat_pairs
        WHERE session_id = ?
        ORDER BY turn_index ASC
    `);
    const rows = stmt.all(sessionId);
    for (const row of rows) {
        messages.push({ role: 'user', content: row.user_message });
        if (row.assistant_reply) {
            messages.push({ role: 'assistant', content: row.assistant_reply });
        }
    }
    console.log('memory is ::::', messages);
    return messages;
}