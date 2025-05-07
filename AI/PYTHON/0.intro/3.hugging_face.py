import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

client = InferenceClient(model='mistralai/Mistral-7B-Instruct-v0.3')

prompt = "can you speak in korean?"
response = client.text_generation(prompt)

print(response) 