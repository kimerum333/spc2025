import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.runnables import RunnableLambda

# 환경변수 로드
print("🔧 Loading environment variables...")
load_dotenv()

api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("❌ OPENAI_API_KEY가 .env에 설정되지 않았습니다.")
print("🔐 API Key 로드 완료")

# 프롬프트 템플릿
template = """
다음 내용을 3문장으로 요약하시오:
본문: {article}
"""
prompt = ChatPromptTemplate.from_messages(
    [
        HumanMessagePromptTemplate.from_template(template)
    ]
)

# llm = ChatOpenAI(model='gpt-4o',temperature=0.5)
llm = ChatOpenAI(model='gpt-4o-mini',temperature=0.5)

# 체인 구성: PromptTemplate → LLM → 후처리(lambda로 딕셔너리화)
chain = prompt | llm | RunnableLambda(lambda x: {"summary": x.content.strip()}) #chat 모드에서는 응답이 x.content 에 담겨온다.


# 입력 텍스트
input_text = """
"현대 사회에서 인공지능 기술은 더 이상 단순한 기계 학습이나 데이터 분석 도구에 머무르지 않고, 인간의 언어를 이해하고 생성하며 맥락을 파악하는 수준까지 발전함에 따라 기업은 고객 응대 자동화, 개인 맞춤형 추천 시스템, 자동 보고서 작성 및 자연어 검색 최적화 등 다양한 분야에서 이 기술을 활용하고 있으며, 이는 비용 절감과 업무 효율 향상이라는 실질적인 이점을 제공할 뿐 아니라, 창의적인 작업에 대한 인간의 부담을 덜어줌으로써 전체적인 생산성과 만족도를 높이는 데 크게 기여하고 있고, 이에 따라 정부 기관이나 교육 기관 또한 AI를 활용한 행정 처리 자동화, 학습 성과 예측 시스템, 지능형 튜터링 솔루션 등의 도입을 적극적으로 검토하고 있으며, 이러한 흐름 속에서 개인 사용자들 역시 일상 속에서 챗봇, 번역기, 음성 비서 등의 형태로 AI 기술을 접하며 그 유용성을 체감하고 있고, 결과적으로 사회 전반에 걸쳐 인공지능 기술은 기존의 일하는 방식, 의사결정 과정, 심지어 인간 간의 소통 방식마저도 변화시키는 강력한 동력으로 자리매김하고 있으며, 이에 따라 기술 발전에 따른 윤리적 문제와 개인정보 보호, 알고리즘의 공정성과 투명성에 대한 논의 역시 더욱 중요해지고 있는 상황이다"
"""

# 실행
print("🧠 요약 실행 중...")
result = chain.invoke({"article": input_text})

# 결과 출력
print("\n✅ 요약 결과:")
print(result["summary"])
