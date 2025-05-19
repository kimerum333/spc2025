import os
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain.prompts import PromptTemplate

load_dotenv()
api_key = os.getenv('ANTHROPIC_API_KEY')
print(api_key)

llm = ChatAnthropic(
    model='claude-3-5-haiku-20241022',
    temperature=0.7,
    max_tokens_to_sample=1000
)

# response = llm.invoke("인공지능이란?")
# print(response.content)

template = PromptTemplate.from_template("다음 주제에 대해 설명해주세요. \n\n주제:{topic}")
# prompt = template.format(topic='GPT')

chain = template | llm
response = chain.invoke({"topic":"Claude"})
print(response.content)