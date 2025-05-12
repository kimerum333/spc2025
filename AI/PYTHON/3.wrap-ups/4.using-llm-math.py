import os
from dotenv import load_dotenv
from langchain_openai import OpenAI, ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda

# 러너블 람다 말고도 패스스루 같은 좀 더 고차원의 추상화된 파이프라인 작성법들도 존재.
from langchain.agents import load_tools, initialize_agent, AgentType




# 환경변수 로드
print("🔧 Loading environment variables...")
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("❌ OPENAI_API_KEY가 .env에 설정되지 않았습니다.")
print("🔐 API Key 로드 완료")

# llm = ChatOpenAI(model='gpt-4o',temperature=0.5)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

# agent 의 특징  : tools. 각 툴마다 키가 필요한게 보통이나, 몇몇은 예외. arxiv, 위키피디아
tools = load_tools(["llm-math"],llm=llm)

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

# result = agent.invoke(
#     {"input": "123*(4+5) 는 얼마야?"}
# )


result = agent.invoke(
    {"input": "삼각형의 높이가 10이고 밑변이 90이면 면적은 얼마야?"}
)

print(result["output"])