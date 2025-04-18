from bs4 import BeautifulSoup

html = """
<html>
<head>
    <title> 간단한 HTML예제 </title>
</head>
<body>
    <h1>안녕하세요 </h1>
    <p>이것은 간단한 html예제입니다.</p>
</body>
</html>
"""

soup = BeautifulSoup(html,'html.parser')
print(html)
print('-'*8)
print(soup)

print(soup.title)
print(soup.h1)
print(soup.h1.text)
print(soup.p)
print(soup.p.text)
