from flask import Flask, request, send_from_directory, jsonify, Response
from dotenv import load_dotenv
from langchain_openai import OpenAI
import os
import json

from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure static folder
app.static_folder = 'static'

#llm setting
llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.3,
    max_tokens=1000
)


def make_json_response(data: dict, status=200):
    return Response(
        json.dumps(data, ensure_ascii=False),
        content_type='application/json; charset=utf-8',
        status=status
    )

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')


@app.route('/review', methods=['POST'])
def review():
    
    template = PromptTemplate.from_template("""
    당신은 숙련된 시니어 개발자입니다. 다음 코드를 읽고 문제점, 개선점, 잠재적 버그에 대해 설명해 주세요.

    코드:
    {code}
    """)
    chain = template | llm
    
    
    data = request.get_json()
    code = data.get("code", "")

    if not code.strip():
        return make_json_response({"result": "코드 입력이 비어 있습니다."})

    try:
        response = chain.invoke({"code": code})
        return make_json_response({"result": response.content})  # ✅ content만 추출
    except Exception as e:
        return make_json_response({"result": f"에러 발생: {str(e)}"}, status=500)

if __name__ == '__main__':
    app.run(debug=True)