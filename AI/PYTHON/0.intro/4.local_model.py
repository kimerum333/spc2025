#pip install transformers protobuf sentencepiece torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from huggingface_hub import login
from dotenv import load_dotenv

import os
load_dotenv(dotenv_path='../.env')

model_name = 'mistralai/Mistral-7B-Instruct-v0.3'
login(token=os.getenv('HF_LOGIN_KEY'))

#모델불러오기
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name,torch_dtype="auto")

#파이프라인 생성
generator = pipeline("text-generation",model = model, tokenizer=tokenizer)

#질문
prompt = "what are the best workout tips?"
outputs = generator(prompt)

print(outputs)