from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory 

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)
memory = ChatMessageHistory()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant"),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

chain = prompt | llm

chain_with_memory = RunnableWithMessageHistory(
    chain,
    lambda x: memory,  # session_id -> memory getter
    input_messages_key="input",
    history_messages_key="history"
)

def chat(message):
    response = chain_with_memory.invoke(
        {"input": message},
        config={
            "configurable": {"session_id": "default"},
            "verbose": True
        }
    )
    return response.content

print(chat("안녕"))
print(chat("우리 무슨 이야기를 할까"))
print(chat("난 AI 어플리케이션 개발에 대한 이야기를 하고 싶어."))
print(chat("AI에게 주식 추천을 맡기려면, LLM은 어떤 정보를 필요로 할까?"))
