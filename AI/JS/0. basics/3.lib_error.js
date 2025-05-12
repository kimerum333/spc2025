const{ OpenAI }= require('openai');
require('dotenv').config({ path: '../.env' }); // .env 파일 불러오기
const key = process.env.AI_KEY;

const openai = new OpenAI({
    apiKey:key
});

async function getGPTResponse(userInput){
    try{
        const response = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages: [
                {role: 'system', content:'You are a highly skilled software engineer'},
                {role:'user' , content : userInput}
            ],
            temperature: 0.7
        })
        return response.choices[0].message.content;
    }catch(error){
        if(error.status){
            const status = error.status;
            switch(status){
                case 429 :
                    console.log('한도 초과');
                    break;
                case 401 :
                    console.log('무권한');
                    break;
                case 403 :
                    console.log('모델무권한');
                    break;
                default :
                    console.log('몰게숨');
                    
            }
        }
    }
}

async function chatWithUser(){
    const userInput = '부트캠프에서 코딩을 어느정도 배웠던(랭귀지의 기본은 이해하는 수준) 적당한 수준의 지원자들이 모여서 해볼만한 팀 프로젝트 주제 추천좀. 신입 프로그래머의 포트폴리오로 매력적이어야함.';
    const chatGPTResponse = await getGPTResponse(userInput);
    console.log('챗봇 응답',chatGPTResponse);
}

chatWithUser();