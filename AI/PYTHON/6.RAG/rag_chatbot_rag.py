from langchain_chroma import Chroma
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser

from dotenv import load_dotenv
load_dotenv()

import os

PERSIST_DIR = "./chroma_db"
embedding_model = OpenAIEmbeddings()
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)

# 벡터DB 인스턴스
db = Chroma(persist_directory=PERSIST_DIR, embedding_function=embedding_model)
retriever = db.as_retriever(search_kwargs={"k": 3})

# 프롬프트 설정
prompt = ChatPromptTemplate.from_template("""
[문서 정보]
{context}

[질문]
{question}

→ 문서 기반으로만 정답을 생성하세요.
""")

rag_chain = (
    {"context": retriever | RunnableLambda(lambda docs: "\n\n".join([doc.page_content for doc in docs])),
     "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

def ingest_file(filepath: str):
    ext = os.path.splitext(filepath)[1].lower()
    if ext == ".txt":
        loader = TextLoader(str(filepath), encoding="utf-8")
    elif ext == ".pdf":
        loader = PyPDFLoader(str(filepath))
    else:
        raise ValueError("지원되지 않는 파일 형식입니다.")
    
    documents = loader.load()
    chunks = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200).split_documents(documents)
    
    db = Chroma(persist_directory=PERSIST_DIR, embedding_function=embedding_model)
    db.add_documents(chunks)

def get_answer(question: str) -> str:
    return rag_chain.invoke(question)
