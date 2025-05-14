from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory 
from langchain_core.output_parsers import StrOutputParser
import uuid

# 환경 변수 로드
load_dotenv()

# LLM 설정
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

# 프롬프트 템플릿
prompt = ChatPromptTemplate.from_messages([
    ("system", "너는 친절한 AI 챗봇이야"),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

# 🔐 세션 기반 메모리 저장소
store: dict[str, ChatMessageHistory] = {}

# 세션 ID에 따라 히스토리를 반환하는 함수
def get_session_history(session_id: str) -> ChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

# RunnableWithMessageHistory 구성
chain = RunnableWithMessageHistory(
    prompt | llm | StrOutputParser(),
    get_session_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 대화 함수
def chat(message: str, session_id: str = "default") -> str:
    response = chain.invoke(
        {"input": message},
        config={
            "configurable": {"session_id": session_id}
        }
    )
    return response

# 새로운 세션 ID 생성
session_id = str(uuid.uuid4())
print("세션아이디는, ",session_id)

print("AI 챗봇에 오신걸 환영합니다. '종료'라고 입력하면 대화를 종료합니다.")
while True:
    user_input = input("나 : ")
    if user_input.lower() in ["종료", "exit", "quit"]:
        print("대화를 종료합니다.")
        break
    response = chat(user_input, session_id=session_id)
    print(response)