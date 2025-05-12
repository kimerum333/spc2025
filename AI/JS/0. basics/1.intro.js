const axios = require('axios');
require('dotenv').config({ path: '../.env' }); // .env 파일 불러오기


const key = process.env.AI_KEY;

//console.log(key);

const url = `https://api.openai.com/v1/chat/completions`


async function call() {
    const response = await axios.post(url,
        {//body
            "model": "gpt-3.5-turbo",
            "messages": [
                //            {"role":"system", 'content':"you are a helpful assistant"}, //가장 기본적인 시스템 프롬프트
                // {"role":"system", 'content':"you are a software engineer"}
                { 'role': 'user', 'content': `좋아. 너한테 요청하는 이 api는 굉장히 사용하기 까다롭네. "messages":[{'role':'user,'content':'이렇게'}] 나는 이런식으로 요청을 보내야만 하잖아. 뭔가 이 'role'을 어떻게 쓰라는건지 예시를 몇개들어줄래? ` }
            ]
        },
        {//header
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            }
        }
    )

    const data = response.data;
    console.log(response.data.choices[0].message.content);

}

call();
