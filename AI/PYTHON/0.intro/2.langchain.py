import os
from dotenv import load_dotenv
from langchain_openai import OpenAI

# Load environment variables
load_dotenv(dotenv_path='../.env')

# Create OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Prompt
prompt = "회사 이름 작명하고 싶어. 나의 회사는 아케이드 게임 만드는 회사야."

# Generate multiple completions
result = client.generate([prompt] * 5)  # 5개 요청

# 출력
for i, generation_list in enumerate(result.generations):
    print(f"=== Generation {i+1} ===")
    for gen in generation_list:
        print(gen.text.strip())
