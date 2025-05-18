from dotenv import load_dotenv
import os

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
# from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import PyPDFLoader

# from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma

from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

# 저장 경로 설정
PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "secure_coding_python"

def create_vector_db(pdf_file_name):
    print("create_vector_db.........")
    # # 1. 텍스트 문서 읽기
    # loader = TextLoader('./my-docs.txt', encoding='utf-8')
    # documents = loader.load()
    
    loader = PyPDFLoader(pdf_file_name)
    # loader = PyPDFLoader("Python_시큐어코딩_가이드(2023년_개정본).pdf")
    documents = loader.load()  # 페이지별로 Document 리스트 반환
    
    # 문서에 메타데이터 추가
    documents = [Document(page_content=doc.page_content, metadata={"source": "python_secure_code_guide.pdf"}) for doc in documents]

    # 2. 문서 쪼개기
    text_splitter = CharacterTextSplitter(
        separator="\n\n", #문서 구분자
        chunk_size=2000, #최대 토큰 단위
        chunk_overlap=200 #이전문서와 중복할 단위
    )
    texts = text_splitter.split_documents(documents)

    # 3. 임베딩 및 저장
    embeddings = OpenAIEmbeddings()
    store = Chroma.from_documents(
        texts,
        embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory=PERSIST_DIR
    )
    return store

def load_vector_db():
    print("load_vector_db.........")
    embeddings = OpenAIEmbeddings()
    store = Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
        persist_directory=PERSIST_DIR
    )
    return store

# DB 생성 or 로드
if os.path.exists(PERSIST_DIR):
    store = load_vector_db()
else:
    store = create_vector_db("Python_시큐어코딩_가이드(2023년_개정본).pdf")

print("✅ 벡터 DB 준비 완료!")

# 3. 대화하기 위한 모델 정의
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# 4. 데이터를 추출할 소스 정의
retriever = store.as_retriever()

# 5. 질문 템플릿 생성
template = """
다음 내용을 참고해서 사용자의 질문에 답변하시오: 
{context}

위 내용 안에서만 답변하시오. 내용이 없을 경우 반드시 "모릅니다"라고 답하시오.
자신의 지식으로 추론하지 마시오. 
질문: {question}

답변을 작성하고 마지막에 "출처: " 라고 해서 문서의 출처를 명시해줘.
"""

prompt = ChatPromptTemplate.from_template(template)

chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

def answer_question(question: str):
    result = chain.invoke(question)
    if "출처" in result:
        answer, sources = result.split("출처:",1)
    else:
        sources = "출처 정보를 찾을 수 없습니다."

    return f"질문 : {question} \n 응답: {answer.strip()} \n 출처: {sources}"

print(answer_question("시큐어 코딩이란 무엇이야?"))
print(answer_question("파이썬으로 된 코드의 대표적인 보안 취약점을 몇가지 ordered list 형태로 알려줘."))