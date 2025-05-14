from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.5)
memory = ChatMessageHistory()

# 메모리 관리의 신문법 : 프롬프트 안에 히스토리를 끼워넣을 공간을 만든다.
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant"),
    MessagesPlaceholder(variable_name="history"),
    ("human","{input}")
])

chain = prompt | llm

def chat(message):
    response = chain.invoke({
        "input":message,
        "history":memory.messages
    })
    memory.add_user_message(message)
    memory.add_ai_message(response.content)
    return response.content

print(chat("안녕"))
print(chat("우리 무슨 이야기를 할까"))
print(chat("난 AI 어플리케이션 개발에 대한 이야기를 하고 싶어."))
print(chat("AI에게 주식 추천을 맡기려면, LLM은 어떤 정보를 필요로 할까?"))
