from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_core.runnables import RunnableLambda

from langchain_openai import ChatOpenAI

print("🔧 Loading environment variables...")
load_dotenv()

llm = ChatOpenAI(model = "gpt-3.5-turbo",temperature=0.5)

# 1. 시스템 프롬프트 분리 없음
chat_prompt1 = ChatPromptTemplate.from_template(
    "너는 요리사야. 다음 질문에 대해서 답변해줘. : {input}"
)
chain1 = chat_prompt1 | llm | RunnableLambda(lambda x: {"response" : x.content})

response = chain1.invoke({"input" : "김치를 만드는 가장 쉬운 방법을 알려줘"})["response"]
print(response)


# 2. 시스템 프롬프트를 분리함
system_template = """너는 전문 번역가야. 다음 글을 보고 {input_language} 로부터
{output_language}로 번역을 해야 해.
 """

system_message_prompt = SystemMessagePromptTemplate.from_template(system_template)
human_message_prompt = HumanMessagePromptTemplate.from_template("{text}")

chat_prompt2 = ChatPromptTemplate.from_messages(
    [system_message_prompt,human_message_prompt]
)

chain2 = chat_prompt2 | llm | RunnableLambda(lambda x: {"response" : x.content})
response2 = chain2.invoke({"input_language":"영어","output_language" : "한국어", "text" : "Hello Donald Trump! I am Han, Minister of magic in Korea"})
print(response2)

# 3. 후처리 파서 사용
from langchain_core.output_parsers import CommaSeparatedListOutputParser
chain3 = chat_prompt2 | llm | CommaSeparatedListOutputParser()
response3 = chain3.invoke({"input_language":"영어","output_language" : "한국어", "text" : "Hello Donald Trump! I am Han, Minister of magic in Korea"})
print(response3)
