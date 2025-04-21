from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
import requests
from bs4 import BeautifulSoup
import os

import csv
import json

from urllib.parse import urlparse, urljoin

# import openpyxl  #엑셀 저장용 라이브러리
# import gspread #구글 스프레드시트용


options = Options()
options.add_argument("--headless")

URL = "https://www.moviechart.co.kr/rank/realtime/index/image"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}


# HTML요청
response = requests.get(URL, headers=HEADERS)
# if(response.status_code == 200):
#     print('성공')
response.raise_for_status()  # 오류 발생시 예외 발생

soup = BeautifulSoup(response.text, "html.parser")

# 미션 영화 랭킹을 가져오시오
# movieBox-list 클래스의 ul 로부터 파싱,
# 내부의 movieBox-item클래스의 li들이 각각 하나의 영화를 담당.
# class Movie:
#     def __init__(self,title,rank):
#         self.title = title
#         self.rank = rank
#         self.href = None
#         self.img_url = None

# movies: list[Movie] = []

movie_cards = soup.select("div.movieBox li.movieBox-item")
print(len(movie_cards))

def sanitize_filename(name):
    import re #
    return re.sub(r'[\\/*?:"<>| ]','_',name) # r = replace

movies = []
movies_json = []


for card in movie_cards:
    title_tag = card.select_one("div.movie-title h3")
    img_tag = card.select_one("img")
    link_tag = card.select_one("a")

    title = title_tag.text.strip() if title_tag else "제목 없음"
    image_url = img_tag["src"] if img_tag and img_tag.has_attr("src") else "이미지 없음"
    detail_link = (
        "https://www.moviechart.co.kr" + link_tag["href"] if link_tag else "링크 없음"
    )

    # print(f"제목: {title}, 이미지: {image_url}, 상세페이지: {detail_link}")
    movies.append([title, image_url, detail_link])
    movies_json.append({"title": title, "image": image_url, "detail": detail_link})

# 이미지 처리
os.makedirs('thumbnails', exist_ok=True)
for movie in movies:
    title:str = movie[0]
    title = sanitize_filename(title)
    #parsed_url = url.split("source=")[1]
    BASE_URL = "https://www.moviechart.co.kr"
    parsed_url = urljoin(BASE_URL,movie[1])
    print(parsed_url)
    response = requests.get(parsed_url,headers=HEADERS)
    img_data = response.content
    if( len(img_data) > 0):
        filename = f"thumbnails/{title}.jpg"
        with open(filename,'wb') as f:
            f.write(img_data)

csv_filename = "movie_chart.csv"
with open(csv_filename, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["제목", "이미지", "상세링크"])
    writer.writerows(movies)

    print(f"csv 저장 완료 : {csv_filename}")

json_filename = "movie_chart_json"
with open(json_filename, "w", encoding="utf-8") as f:
    json.dump(movies_json, f, ensure_ascii=False, indent=4)

    print(f"JSON 저장 완료: {json_filename}")


# 제목 이미지url 상세페이지 링크
