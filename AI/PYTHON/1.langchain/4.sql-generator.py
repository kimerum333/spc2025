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
llm = OpenAI(api_key=api_key, temperature=0.3)

# 프롬프트 템플릿
template = """
다음 요청에 대한 SQL문을 작성하시오. 설명 없이 오직 SQL구문만을 응답하세요:

{query}

SQL 구문:
"""
prompt = PromptTemplate.from_template(template)

# 체인 구성: PromptTemplate → LLM → 후처리(lambda로 딕셔너리화)
chain = prompt | llm | RunnableLambda(lambda x: {"sql": x.strip()})

# 입력 텍스트
input_text = """
Employees 테이블로부터 Salary 가 30000 이상인 사람들 중 gender 가 male 인 사람들의 full name, email, 전체 직원 중 차지하는 비율 을 출력하라.
full name 은 해당 칼럼이 테이블에 없기 때문에 first_name 과 last_name 을 합성해 만들어야 한다.
정렬은 name 으로 desc 로 한다.
"""

# 실행
print("🧠 쿼리작성 실행 중...")
result = chain.invoke({"query": input_text})

# 결과 출력
print("\n✅ 쿼리작성 결과:")
print(result["sql"])
