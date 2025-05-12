import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType

# 환경변수 로드
print("🔧 Loading environment variables...")
load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("❌ OPENAI_API_KEY가 .env에 설정되지 않았습니다.")
print("🔐 API Key 로드 완료")

# llm = ChatOpenAI(model='gpt-4o',temperature=0.5)
llm = ChatOpenAI(model='gpt-4o-mini',temperature=0.5)

# agent 의 특징  : tools. 각 툴마다 키가 필요한게 보통이나, 몇몇은 예외. arxiv, 위키피디아
tools = load_tools(["arxiv"])

agent = initialize_agent(
    tools = tools,
    llm = llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose = True
)

result = agent.invoke({
    'input' : '최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘.'
})

print(result['output'])