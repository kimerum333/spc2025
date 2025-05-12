import os
from dotenv import load_dotenv
from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_community.utilities import GoogleSearchAPIWrapper,WikipediaAPIWrapper
from langchain_experimental.plan_and_execute import PlanAndExecute,load_agent_executor, load_chat_planner
from langchain_openai import ChatOpenAI
from langchain.chains import LLMMathChain
from langchain.tools import Tool

# serper => 구글검색 api 키를 대신 받아주는 서비스!

# 러너블 람다 말고도 패스스루 같은 좀 더 고차원의 추상화된 파이프라인 작성법들도 존재.
from langchain.agents import load_tools, initialize_agent, AgentType


# 환경변수 로드
print("🔧 Loading environment variables...")
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("❌ OPENAI_API_KEY가 .env에 설정되지 않았습니다.")
print("🔐 API Key 로드 완료")

# llm 설정
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

# 도구에 사용할 툴별 키 체크
google_api_key = os.getenv('GOOGLE_API_KEY')
google_cse_key = os.getenv('GOOGLE_CSE_ID')
if not (google_api_key or google_cse_key):
    raise ValueError('필요한 키가 설정되어 있지 않습니다.')
else:
    print("구글 키가 잘 로드되었습니다.")

# 각종 도구 설정
llm_math_chain = LLMMathChain.from_llm(llm=llm,verbose=True)
search = GoogleSearchAPIWrapper()
wikipedia = WikipediaAPIWrapper()

tools = [
    Tool(
        name="Search",
        func=search.run,
        description="Useful for answering questions using Google Search"
    ),
    Tool(
        name="Wikipedia",
        func=wikipedia.run,
        description="Useful for looking up facts and statistics"
    ),
    Tool(
        name="Calculator",
        func=llm_math_chain.run,
        description="Useful for answering math-related questions or calculations"
    )
]

planner = load_chat_planner(llm)
executor = load_agent_executor(llm,tools,verbose=True)
agent = PlanAndExecute(planner =planner,executor=executor,verbose=True)

prompt = "최근 10회의 하계 올림픽 개최 기록을 확인해서 그 개최 국가와 최다 금메달 획득 국가를 확인하고 md 표 형태로 출력해줘. 그리고 다음 올림픽 개최 국가도 확인해서 표에 추가해줘. 물론, 여기에서는 최다 금메달 획득 국가는 null처리해야겠지."
result = agent.invoke(prompt)

print(result["output"])