import os
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda

# 1. 환경변수 로드
print("🔧 Loading environment variables...")
load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("❌ OPENAI_API_KEY가 .env에 없습니다.")
print("🔐 API Key 로드 완료")

# 2. LLM 구성
llm = OpenAI(api_key=api_key, temperature=0.4)

# 3. 프롬프트 템플릿 정의
template = """
당신은 회사의 최고 운영 책임자(COO)입니다.
다음 팀에게 공식적인 회사 이메일을 작성하십시오.

팀: {team}
이슈: {issue}

이메일은 다음 조건을 만족해야 합니다:
- 말투는 정중하고 비즈니스적이어야 합니다.
- 문제 상황을 정확히 짚고, 팀에 요청하거나 권장하는 조치를 구체적으로 제시하십시오.
- "감사합니다."로 마무리하십시오.
"""

prompt = PromptTemplate.from_template(template)

# 4. 체인 구성
chain = prompt | llm | RunnableLambda(lambda x: {"email": x.strip()})

# 5. 팀 & 이슈 입력
teams = [
    "개발팀",
    "마케팅팀",
    "인사팀",
    "총무팀",
    "재무팀",
]

topics = [
    "너희의 많은 버그로인한 사용자불만",
    "버그로 줄어드는 사용자를 다시 붙잡기 위한 전략",
    "버그를 만드는 개발자를 해고하기 위한 전략",
    "해고이후, 직원들의 동기부여를 위한 다과파티",
    "주주들에게 보내는 서한",
]

# 6. 실행 루프
print("\n📧 이메일 생성 결과:\n")
for team, topic in zip(teams, topics):
    result = chain.invoke({"team": team, "issue": topic})
    print(f"📝 [{team}]에게 보내는 이메일:")
    print(result["email"])
    print("\n" + "="*60 + "\n")
