from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory 
import uuid

# 환경 변수 로드
load_dotenv()

# LLM 설정
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

# 프롬프트 템플릿
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant"),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

# 프롬프트 + 모델 체인
chain = prompt | llm

# 🔐 세션 기반 메모리 저장소
store: dict[str, ChatMessageHistory] = {}

# 세션 ID에 따라 히스토리를 반환하는 함수
def get_session_history(session_id: str) -> ChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

# RunnableWithMessageHistory 구성
chain_with_memory = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 대화 함수
def chat(message: str, session_id: str = "default") -> str:
    response = chain_with_memory.invoke(
        {"input": message},
        config={
            "configurable": {"session_id": session_id},
            "verbose": True  # 디버그용 출력
        }
    )
    return response.content

# 새로운 세션 ID 생성
session_id = str(uuid.uuid4())
print("세션아이디는, ",session_id)

# 기본 세션으로 대화
print(chat("안녕", session_id="user-123"))
print(chat("우리 무슨 이야기를 할까", session_id="user-123"))
print(chat("난 AI 어플리케이션 개발에 대한 이야기를 하고 싶어.", session_id="user-123"))
print(chat("AI에게 주식 추천을 맡기려면, LLM은 어떤 정보를 필요로 할까?", session_id="user-123"))
