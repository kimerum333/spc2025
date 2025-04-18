from bs4 import BeautifulSoup

html = """
<html>
<head>
    <title> 간단한 HTML예제 </title>
</head>
<body>
    <h1>안녕하세요 </h1>
    <p>이것은 간단한 html예제입니다.</p>
    <ul>
        <li>1ㄱ</li>
        <li>2ㄴ</li>
        <li>3ㄷ</li>
        <li>4ㄹ</li>
    </ul>
</body>
</html>
"""

soup = BeautifulSoup(html,'html.parser')
lis = soup.ul.find_all('li')
print(lis)

# for li in lis:
#     print(li.text)

for li in soup.ul.find_all('li'):
    print(li.text)