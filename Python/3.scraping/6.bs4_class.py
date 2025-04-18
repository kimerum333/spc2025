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
        <ul>
            <li>1ㄱ</li>
            <li>2ㄴ</li>
            <li>3ㄷ</li>
            <li>4ㄹ</li>
        </ul>
        <div class="footer">
            <p id="copyright"> 저작권 copyright 2025. 내꺼</p>
        </div>
    </div>
</body>
</html>
"""

soup = BeautifulSoup(html,'html.parser')
containder_div = soup.find('div', class_='container')
# print(containder_div)

#푸터 안의 글자
footer = soup.find('div', class_='footer')
print(footer.p.text)

print(soup.find('p',id="copyright"))
