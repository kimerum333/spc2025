import os
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda

# 환경변수 로드
print("🔧 Loading environment variables...")
load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("❌ OPENAI_API_KEY가 .env에 설정되지 않았습니다.")
print("🔐 API Key 로드 완료")

# LLM 구성
llm = OpenAI(api_key=api_key, temperature=0.5)

# 프롬프트 템플릿
template = """
다음 내용을 3문장으로 요약하시오:

{input}

요약:
"""
prompt = PromptTemplate.from_template(template)

# 체인 구성: PromptTemplate → LLM → 후처리(lambda로 딕셔너리화)
chain = prompt | llm | RunnableLambda(lambda x: {"summary": x.strip()})

# 입력 텍스트
input_text = """
LangChain is a framework for developing applications powered by language models.
It enables composition of multiple components like prompt templates, models, retrievers, and tools into flexible pipelines.
This helps developers build contextual, responsive, and intelligent LLM-powered applications quickly.
"""

# 실행
print("🧠 요약 실행 중...")
result = chain.invoke({"input": input_text})

# 결과 출력
print("\n✅ 요약 결과:")
print(result["summary"])
