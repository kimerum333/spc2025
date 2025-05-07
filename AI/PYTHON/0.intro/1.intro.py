import os
from dotenv import load_dotenv
from openai import OpenAI

# load dotenv
load_dotenv(dotenv_path='../.env')


# 사실 이 코드는 디폴트다.
# client = OpenAI(
#     api_keys = os.getenv('OPENAI_API_KEY')
# )
client = OpenAI()

model_list = client.models.list()
