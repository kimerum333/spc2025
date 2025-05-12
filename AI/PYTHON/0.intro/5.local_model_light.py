#pip install transformers protobuf sentencepiece torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from huggingface_hub import login
from dotenv import load_dotenv

import os
load_dotenv(dotenv_path='../.env')

model_name = 'gpt2'
login(token=os.getenv('HF_LOGIN_KEY'))

#모델불러오기
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name,torch_dtype="auto")

#파이프라인 생성
generator = pipeline(
    "text-generation",
    model = model, 
    tokenizer=tokenizer,
    temperature=0.7,
    max_new_tokens = 128, #출력 토큰 길이
    pad_token_id = tokenizer.eos_token_id,
    do_sample=True,
    top_k=50, #확률분포 높은 k개만 골라라
    top_p=0.95, # 선택 확률이 높은 P%내에서만 골라라.
    repetition_penalty = 1.2, #반복 억제
    no_repeat_ngram_size =3 #3단어 이상 반복 금지
    )

#질문
prompt = "how much money is needed to live a healthy life?"
outputs = generator(prompt)

print(outputs[0]["generated_text"])