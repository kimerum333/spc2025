import os
from dotenv import load_dotenv
from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_community.utilities import GoogleSearchAPIWrapper,WikipediaAPIWrapper
from langchain_experimental.plan_and_execute import PlanAndExecute,load_agent_executor, load_chat_planner
from langchain_openai import ChatOpenAI
from langchain.chains import LLMMathChain


load_dotenv()

from langchain.tools import tool #나만의 툴 정의하는건 소문자 툴이더라.

#나만의 툴은 @tool 이라는 데코레이터로 정의한다.
#함수 안의 주석도 의미가 있는 주석이다. 이 함수의 역할을 자연어로 정의한 것.
@tool
def add(query: str) -> int:
    """
    두 숫자를 더합니다. 형식: '숫자1 숫자2'
    """

    #따옴표 제거
    query = query.replace("'","").replace('"',"").strip()

    #숫자 추출해서 더하기
    nums = [int(x) for x in query.split()]
    return nums[0]+nums[1]

@tool
def multiply(query: str) -> int:
    """
    두 숫자를 곱합니다. 형식: '숫자1 숫자2'
    """

    #따옴표 제거
    query = query.replace("'","").replace('"',"").strip()

    #숫자 추출해서 더하기
    nums = [int(x) for x in query.split()]
    return nums[0]*nums[1]

@tool
def divide(query: str) -> int:
    """
    두 숫자를 나눕니다. 형식: '숫자1 숫자2'
    """

    #따옴표 제거
    query = query.replace("'","").replace('"',"").strip()

    #숫자 추출해서 더하기
    nums = [int(x) for x in query.split()]
    return nums[0]/nums[1]

#도구 일단 담아주기
tools = [add]

llm = ChatOpenAI(model="gpt-4o-mini",temperature=0.2)


agent = initialize_agent(
    tools=tools,
    llm = llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose= True
)

result = agent.invoke({"input":"3과 4를 더하고 그 결과에 다시 5를 더하시오. 이후 그 결과에 2를 빼시오."})
print("최종결과 : ", result)