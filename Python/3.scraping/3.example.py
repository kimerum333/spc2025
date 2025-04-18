import requests

url = 'https://example.com'

response = requests.get(url)
data = response.text

# 이 구조는 자료구조로 볼 때 String, plain text
print(data)

