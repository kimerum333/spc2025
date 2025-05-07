CREATE TABLE chat_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,               -- 옵션: 사용자 식별자
    title TEXT,                    -- 옵션: 세션 요약 or 제목
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_pairs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,           -- chat_sessions.id와 연결
    turn_index INTEGER NOT NULL,           -- 대화 순서
    user_message TEXT NOT NULL,            -- 사용자 입력
    assistant_reply TEXT,                  -- GPT 응답 (nullable)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
        ON DELETE CASCADE
);
