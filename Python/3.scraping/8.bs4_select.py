from bs4 import BeautifulSoup

html = """
<html>
<head>
    <title> 간단한 HTML예제 </title>
</head>
<body>
    <div class="container">
        <h1>안녕하세요 </h1>
        <p>이것은 간단한 html예제입니다.</p>
        <a href="http://www.naver.com">네이버 바로가기</a>
        <img src="example.jpg" alt="" srcset="">
        <img src="example2.jpg" width="500", height="600" alt="" srcset="">
        <ul>
            <li>1ㄱ</li>
            <li>2ㄴ</li>
            <li>3ㄷ</li>
            <li>4ㄹ</li>
        </ul>
        <div class="footer">
            <p id="copyright"> 저작권 copyright 2025. 내꺼</p>
            <a href="http://www.daum.net">다음 바로가기</a>
        </div>
    </div>
</body>
</html>
"""

soup = BeautifulSoup(html, "html.parser")

#하나만
link_tag = soup.select_one('a')
print(link_tag['href'])
print(link_tag.text)

#전부
link_tags = soup.select('a')
for link in link_tags:
    print(link['href'])
    print(link.text)

print('='*20)

# 셀렉트는 css셀렉터 스타일
container_div = soup.select_one('div.container')
print('div_container', container_div, sep=":")

copyright = soup.select_one('#copyright')
print('copyright', copyright, sep=":")
