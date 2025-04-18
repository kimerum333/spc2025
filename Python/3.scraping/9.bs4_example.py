from bs4 import BeautifulSoup
import requests

url = """https://pythonscraping.com/pages/page3.html"""
# 미션 : 해당 페이지에 요청
# 미션2 : 헤딩 페이지를 파싱해서 상품명과 가격을 출력한다.

response = requests.get(url)
# print(response.text)

soup = BeautifulSoup(response.text,'html.parser')
gifts= soup.select('.gift')

for gift in gifts:
    #print(gift.td.text)
    #print(gift.select('td')[2].text)
    tds = gift.select('td')
    title = tds[0].text.strip()
    price = tds[2].text.strip()
    print(f"{title:40} ${price}")

