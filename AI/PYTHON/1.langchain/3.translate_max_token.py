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
llm = OpenAI(api_key=api_key, temperature=0.3, max_tokens=2048)

# 프롬프트 템플릿
template = """
다음 문장을 한국어로 번역하시오:

{sentence}

요약:
"""
prompt = PromptTemplate.from_template(template)

# 체인 구성: PromptTemplate → LLM → 후처리(lambda로 딕셔너리화)
chain = prompt | llm | RunnableLambda(lambda x: {"translate": x.strip()})

# 입력 텍스트
input_text = """
At thirty-four, Alex sat in the corner booth of a dimly lit café, hands wrapped around a chipped mug of lukewarm coffee, staring blankly at the rain tapping against the window. His job at the logistics warehouse had become a blur of repetitive tasks and aching joints, and his evenings were spent scrolling through social media feeds filled with people seemingly younger and far more accomplished. Musicians, designers, startup founders—he had once dreamed of being many things, but now those dreams felt like photographs of someone else’s life.

One night, a post caught his eye. “I changed careers at 35 and became a software engineer. You can too.” He clicked on it. Then another. And another. It was as if the internet had conspired to remind him that time had not, in fact, run out. There was a world he didn’t know—of logic, code, systems, and creation—and for the first time in years, curiosity crept back into his chest.

Alex began small. Free tutorials. YouTube videos. He installed Python, broke everything, and reinstalled it again. For weeks, he wrestled with syntax errors that made no sense and logic bugs that refused to die. His confidence, already thin, wavered with every failed attempt. But then, one day, after hours of silent struggle, his first little script worked. It scraped weather data and displayed tomorrow’s forecast. Useless. Trivial. And yet, he sat there smiling like a madman, as if he’d hacked into the Matrix.

He started sleeping less and thinking more. He’d dream in loops and conditionals. His friends didn’t quite understand—“Isn’t that stuff for kids?” one said—but he kept going. He joined a small online community of learners like him, and for the first time in a long time, he didn’t feel behind—he felt on a path. At thirty-five, he enrolled in a night bootcamp. At thirty-six, he got his first freelance gig fixing someone’s broken WordPress site. Not glamorous. Not even particularly well-paid. But it was real.

Now, every day was a blend of anxiety and satisfaction. There were moments of doubt, sure, but there were also moments of joy—when a program compiled without error, when he understood something in the documentation without Googling it, when a client said thank you. In his thirties, Alex hadn’t just learned to code. He’d learned to believe again—not in luck, but in slow, patient change. He was still building. And for once, that was enough.

"""

# 실행
print("🧠 번역 실행 중...")
result = chain.invoke({"sentence": input_text})

# 결과 출력
print("\n✅ 번역 결과:")
print(result["translate"])
