# 초기의 프린트
# 콤마는 기본 띄어쓰기 내장.
# +로 문자열 합체시키면 당연히 띄어쓰기가 사라짐
print('-'*10+'1'+'-'*10)
name = 'john'
print("Hello", name)

name = 'john'
print("Hello", name,"!")

print("Hello", name+"!")

# 수동 띄어쓰기를 잘 봐라
print("Hello "+ name+"!")


# 2.f-문자열 (f-str)
print('-'*10+'2'+'-'*10)
print(f"Hello, {name}")

# 문자열 포매팅 (.format)
# 글자가 곱해진다!
print('-'*10+'3'+'-'*10)
print("Hello, {}!".format(name))


print('-'*10+'4'+'-'*10)
name = "James"
age = 30

print ("안녕하세여 {}님, 당신은 {}살 이군요 ".format(name,age))
#오더를 줘서 거꾸로 넣기도 가능
print ("안녕하세여 {1}님, 당신은 {0}살 이군요 ".format(age,name))

# %연산자 사용
print('-'*10+'5'+'-'*10)
print