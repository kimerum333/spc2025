import os
from dotenv import load_dotenv
from openai import OpenAI

# load dotenv
# 해당 함수는 만약 현재 폴더에 .env 가 없다면 상위로 올라가서 읽기도 한다.
load_dotenv(dotenv_path='../.env')


# 사실 이 코드는 디폴트다. OPENAI_API_KEY 라는 키값을 기본적으로 읽어오도록 되어 있다.
# client = OpenAI(
#     api_keys = os.getenv('OPENAI_API_KEY')
# )
client = OpenAI()

model_list = client.models.list()
