import os
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic

load_dotenv()
api_key = os.getenv('ANTHROPIC_API_KEY')
print(api_key)

llm = ChatAnthropic(
    model='claude-3-5-haiku-20241022',
    temperature=0.7,
    max_tokens_to_sample=1000
)

response = llm.invoke("인공지능이란?")
print(response.content)