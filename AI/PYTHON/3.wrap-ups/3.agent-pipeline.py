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
llm_summary = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.5)
llm_translate = OpenAI(temperature=0.5)

# agent 의 특징  : tools. 각 툴마다 키가 필요한게 보통이나, 몇몇은 예외. arxiv, 위키피디아
tools = load_tools(["arxiv"])

agent = initialize_agent(
    tools=tools,
    llm=llm_summary,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

# 번역용 체인을 하나 만든다. by 프롬프트 작성, 체이닝
## 프롬프트 작성
template = """
다음 문장을 확인하고, 영어로 되어있다면 한글로, 한글로 되어있다면 영어로 번역해줘.
번역할 문장 :
{text_to_translate}
"""
translate_prompt = PromptTemplate.from_template(template)

## 체이닝
translate_chain = (
    translate_prompt
    | llm_translate
    | RunnableLambda(lambda x: {"translated": x.strip()})
)

#이건 아직 제대로 끝나지 않은 코드
full_chain = (
    RunnableLambda(lambda input: {"input": input["query"]})
    | RunnableLambda(agent.invoke)  # 요약 실행
    | (lambda x: {"text": x["output"]})
    | translate_chain
)

result = agent.invoke(
    {"input": "최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘. 영어로 응답해줘."}
)

translated_result = translate_chain.invoke({"text_to_translate": result["output"]})
print(translated_result)
# print(result['output'])
