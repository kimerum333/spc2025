import os
from dotenv import load_dotenv
from langchain_openai import OpenAI
from flask import Flask, request,jsonify

# Load environment variables
load_dotenv(dotenv_path='../.env')

# Create OpenAI client
llm = OpenAI(api_key=os.getenv('OPENAI_API_KEY'),temperature=0.7)
app = Flask(__name__)

@app.route("/generate",methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt","") #디폴트 빈값

    result = llm.generate([prompt] * 5)  # 5개 요청
    results = []
    for data in result.generations:
        print(data[0].text)
        results.append(data[0].text.strip())

    return jsonify({"response":results})
    
if __name__ == "__main__":
    app.run(port=5000)

#curl -X POST http://localhost:5000/generate -H "Content-Type: application/json" -d "{\"prompt\": \"Write a short motivational quote about learning.\"}"