from dotenv import load_dotenv
load_dotenv()

from langchain_openai import OpenAI

from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools

llm = OpenAI()

tools = load_tools(['google-search'])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

result = agent.invoke({"input":"오늘 서울 날씨는 어때? 한국 말로 출력해줘."})
print(result["output"])