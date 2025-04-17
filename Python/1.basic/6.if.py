score = 85

if score > 80:
    print("A")
elif score > 70:
    print("B")
elif score > 60:
    print("C")
else:
    print('F')


password = input("비밀번호를 입력하세요")
if(len(password) >=8):
    print('정상')
else:
    print('너무 짧음')

file_name = "example.png"
if file_name.endswith("txt"):
    print('텍스트 파일입니다')
elif file_name.endswith("jpg") or file_name.endswith("png"):
    print('그림입니다')
else:
    print("몰루는 파일")

