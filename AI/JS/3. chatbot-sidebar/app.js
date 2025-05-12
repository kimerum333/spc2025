const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

require('dotenv').config({ path: '.env' });

const app = express();
const PORT = 3000;

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
