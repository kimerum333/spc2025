import os
import anthropic
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('ANTHROPIC_API_KEY')
print(api_key)

client = anthropic.Anthropic(api_key=api_key)

message = client.messages.create(
    model = 'claude-3-5-haiku-20241022',
    max_tokens=1000,
    temperature=0.7,
    messages=[
        {"role":"user", "content":"안녕하세요"}
    ]
)

print(message)