#파일은 내장이다. 딱히 임포트 안해도돼!
#다른 언어는 파일을 열기 위한 포인터가 필요함. 열고, 쓰고, 닫고, but 마지막에 파일 포인터 닫는걸 잊는 경우가 많음.
#with구문은 모던 언어의 특징. with 블록 나가는 순간 바로 반납함
with open('./example.txt', 'w', encoding="utf-8") as file:
    file.write("Hello, World! \n")
    file.write('여기에 기록중 \n')
    file.write('--꿑--')

print('파일을 다 썼음')

with open('./example.txt','r', encoding="utf-8") as file:
    for line in file:
        print(line, end='')