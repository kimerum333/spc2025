import os

#로그인중인 사용자 계정
print(os.getlogin())

current_dir = os.getcwd()
print("현재 작업 디렉토리",current_dir)

new_dir = "new_dir"
#os.mkdir(new_dir);
#os.rmdir(new_dir);
