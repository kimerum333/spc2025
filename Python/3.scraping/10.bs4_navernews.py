# https://sports.news.naver.com/index
# 미션1 : 뉴스의 타이틀(제목)만 가져와 출력
# 미션2 : 해당 제목의 url(풀패스로) 도 함께 가져온다.

from bs4 import BeautifulSoup
import requests

url = "https://sports.news.naver.com/index"
response = requests.get(url)
# print(response)

# 1. 오늘의 뉴스 === 타이틀 : li class="today_item" 밑의 a 의 title속성 ==== url : 동일 돔의 href 속성
# 2. 창작자 ======= 타이틀 : lit class="creator_item" 밑의 strong class title === url: 크리에이터 아이템 밑의 a 찾으면 상대경로가 나오므로 원본이랑 합친다.
# 3. vod === 타이틀 : text_area _sports_home_most_viewed_vod_title 의 텍스트 /
# 4. 라이브 === class="match_title"

# 1. 타이틀 가져오고 가장 가까운 상위의 a 링크 가져오면 url 이 될 것이다..


# 아니 다 가져올 필요가 없었네 오늘의 뉴스만 가져오면 됐네..
soup = BeautifulSoup(response.text, "html.parser")
# print(soup.body["class"])


class News:
    def __init__(self, title: str, link: str):
        self.title: str = title
        self.link: str = link
        self.detail: str | None = None

    def getDetail(self) -> None:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        response = requests.get(self.link, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")
        # detail = soup.select_one("._article_content")
        print(soup)


todays = soup.select(".today_item a")
news_list: list[News] = []
for a in todays:
    title = a["title"]
    href = a["href"]
    news_list.append(News(title, href))

for news in news_list:
    print(news.link)
    print(news.title)
    news.getDetail()
    break


# 추천뉴스 섹션.
