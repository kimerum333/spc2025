import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_file
from langchain_openai import OpenAI

# 환경변수 로드
print("🔧 Loading environment variables...")
load_dotenv()

app = Flask(__name__)

# LLM 설정
api_key = os.getenv('OPENAI_API_KEY')
print(f"🔐 Loaded API Key: {'✅' if api_key else '❌'}")

llm = OpenAI(api_key=api_key, temperature=0.7)

# 템플릿 함수
def formatPrompt(template, product):
    return template.format(product=product)

# "/" 경로에서 front.html 반환
@app.route("/")
def index():
    print("📄 '/' route accessed - Serving front.html")
    return send_file("front.html")

# 생성 API
@app.route("/generate", methods=["POST"])
def generate():
    print("📥 '/generate' POST request received")
    data = request.get_json()
    print(f"🧾 Raw request data: {data}")

    product = data.get("ask", "").strip()
    print(f"💬 Prompt received: {product}")

    if not product:
        return jsonify({"error": "prompt 값을 입력해주세요."}), 400

    template = """
    회사 이름을 작명하고 싶어. 
    나의 회사는 {product} 만드는 회사야.
    회사명은 한영 병기해서 알려주고 부가적인 설명은 하지 마.

    예를 들자면, 아케이드 게임을 만드는 회사는
    마이아케이드(MyArcade)

    그럼 이제 작명해줘:\n
    """

    full_prompt = formatPrompt(template, product)

    try:
        result = llm.generate([full_prompt] * 5)
        outputs = [g[0].text.strip() for g in result.generations]
        print(f"✅ Generation successful. Outputs: {outputs}")
        return jsonify({"reply": outputs})
    except Exception as e:
        print(f"❌ Error during generation: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Starting Flask server on port 5000...")
    app.run(port=5000)
