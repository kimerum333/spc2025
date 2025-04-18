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

# 파인드는 처음 하나만 가져온다
link = soup.find("a")
print(link)

# 파인드올은 리스트로 가져온다
links = soup.find_all("a")
print(links)

# 속성은 []로 접근
print(link["href"])

for elem in links:
    print(elem["href"])

print("*" * 10)



# .으로 접근하면 가장 첫번쨰 것을 가져온다.
img = soup.img

#파인드올
imgs = soup.find_all('img')
#배열로 가져오기
img2 = imgs[1]

# 적절한 예외처리로 코드가 멈추는 걸 피한다.
#img3 = imgs[2]
img3 = imgs[2] if len(imgs) > 2 else None

print(imgs)
print(img)
print(img2)
print(img3)

for img in imgs:
    #없을 때 오류난다!
    # print(f" src : {img['src']}, width: {img['width']}, height: {img['height']}")

    #겟 함수를 동원하면 없을 시 대체값을 넣어 오류를 피하며 가져올 수 있다.
    print(f" src : {img['src']}, width: {img.get('width','no width')}, height: {img.get('height','no height')}")
