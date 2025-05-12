const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const Database = require('better-sqlite3');
require('dotenv').config({ path: '.env' });

const app = express();
const PORT = 3000;
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

// Middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let currentSessionId = createNewSession(); // 새 세션 생성

// 라우팅
app.post('/api/chat', async (req, res) => {
    const { userInput } = req.body;

    const turnIndex = getTurnIndex(currentSessionId);
    insertUserMessage(currentSessionId, turnIndex, userInput);

    const memory = buildMemory(currentSessionId);
    const reply = await getChatGptResponse(memory);

    updateAssistantReply(currentSessionId, turnIndex, reply);

    res.json({ message: 'ok', userInput, reply });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// === DB 관련 함수 ===

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
    console.log('memory is ::::',messages);
    return messages;
}

// === GPT 호출 ===
const CHATBOT_URL = 'https://api.openai.com/v1/chat/completions';

async function getChatGptResponse(memory) {
    try {
        const response = await axios.post(
            CHATBOT_URL,
            {
                model: 'gpt-3.5-turbo',
                messages: memory
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.AI_KEY}`
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI Error:', error.response?.data || error.message);
        return '⚠️ GPT 응답 실패';
    }
}
