const { OpenAI } = require('openai');
require('dotenv').config({ path: '.env' }); // .env 파일 불러오기
const key = process.env.AI_KEY;

const openai = new OpenAI({
  apiKey: key
});

async function getGPTResponse(userInput) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a highly skilled software engineer' },
      { role: 'user', content: userInput }
    ],
    temperature: 0.7,
    stream: true,
  })
  return response.choices[0].message.content;
}


const express = require('express');
const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morgan = require('morgan');
app.use(morgan('dev'));

// 정적 파일 제공
app.use(express.static('public'));

// 라우트 설정
app.post('/api/chat', async (req, res) => {
  try {
    const userInput = req.body.message;
    if (!userInput) {
      return res.status(400).json({ error: '메시지가 필요합니다.' });
    }

    const gptResponse = await getGPTResponse(userInput);
    res.json({ response: gptResponse });
  } catch (error) {
    console.error('GPT 응답 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});


app.post('/api/chatstream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream'); // 이벤트스트림! SSE 활성화.
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: req.body.message }],
    stream: true,
  });

  for await (const chunk of completion) {
    // const content = chunk.choices[0]?.delta?.content;
    const content = chunk.choices[0].delta.content || '';
    if (content) {
      res.write(`data: ${content}\n\n`); //프로토콜의 스펙상, data : 메시지 식으로 주게 되어 있다.
    }
  }
  res.write(`data: [DONE]\n\n`); //프로토콜의 스펙상, data : [DONE]\n\n 이면 끝이다.
  res.end();
})


app.get('/api/chat-eventsource', async (req, res) => {
  console.log(req.query.message);
  res.setHeader('Content-Type', 'text/event-stream'); // 이벤트스트림! SSE 활성화.
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: req.query.message }],
    stream: true,
  });

  for await (const chunk of completion) {
    // const content = chunk.choices[0]?.delta?.content;
    const content = chunk.choices[0].delta.content || '';
    if (content) {
      res.write(`data: ${content}\n\n`); //프로토콜의 스펙상, data : 메시지 식으로 주게 되어 있다.
    }
  }

  res.write(`data: [DONE]\n\n`); //프로토콜의 스펙상, data : [DONE]\n\n 이면 끝이다.
  res.end();
})

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});