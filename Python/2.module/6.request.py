import requests

#리퀘스츠는 라이브러리다!
#pip install requests

res = requests.get("http://www.naver.com")
print(res) #객체인것 확인. 객체 타입은 Response
print("헤더정보", res.headers)
print("바디정보", res.text)