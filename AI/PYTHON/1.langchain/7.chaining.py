from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate, PromptTemplate
from langchain_core.runnables import RunnableLambda

from langchain_openai import OpenAI

print("🔧 Loading environment variables...")
load_dotenv()

# 1. 시스템 프롬프트 분리 없음
chat_prompt1 = PromptTemplate(
    input_variables = ["product"],
    template = "너는 회사 이름을 전문적으로 짓는 작명가야. 다음 상품/서비스를 갖는 회사명을 지어줘. 상품명:{product}"
)
chat_prompt2 = PromptTemplate(
    input_variables = ["company_name"],
    template = "이 회사를 잘 소개할 수 있는 슬로건, 또는 캐치프레이즈를 만들어 줘. 회사명:{company_name}"
)

llm = OpenAI(model = "gpt-3.5-turbo-instruct",temperature=0.9)
# llm = ChatOpenAI(model = "gpt-4o",temperature=0.9)

chain1 = (
    chat_prompt1 | llm | RunnableLambda(lambda x: {"company_name":x.strip()}) |
    chat_prompt2 | llm | RunnableLambda(lambda x: {"catch_phrase":x.strip()})
)
response1 = chain1.invoke({"product":"소울라이크 액션RPG"})["catch_phrase"]
print(response1)