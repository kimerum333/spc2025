# 리스트는 [], 튜플은 (), 딕셔너리는 {}
# 리스트랑 뭐가 다른가? => 데이터의 변경이 불가.
my_tuple = (1,2,3,4,5)

print(my_tuple)
print(my_tuple[0])
print(my_tuple[-1])

#가져오는 문법
print("go get it")
a,b,c,d,e = my_tuple
print(a)
print(b)
print(c)
print(d)
print(e)

#튜플은 길이를 알 수 있다.
print("len : ",len(my_tuple))

#튜플은 슬라이싱이 가능하다.
print(my_tuple[1:3])
print(my_tuple[:3])
print(my_tuple[3:])

def add(a,b):
    return a+b

print("합산 : ",add(a,b))

#함수의 리턴값이 여럿일 떄 그 결과는 튜플에 담겨온다.
def get_stats(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    return total, average  # 자동으로 튜플로 리턴됨

# 호출
result = get_stats([1, 2, 3, 4, 5])
print("튜플로 받기:", result)         # (15, 3.0)

# 언패킹 (변수 여러 개로 나눠받기)
total, average = get_stats([1, 2, 3, 4, 5])
print("합계:", total)                # 15
print("평균:", average)              # 3.0
