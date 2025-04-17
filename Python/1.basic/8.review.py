#리스트 컴프리헨션
#[표현식 for 항목 in 리스트객체 if 조건문]

# 1부터 10까지의 숫자 리스트를 만드시오
nums = [x for x in range(1,11)]
print(f"1번결과, {nums}")

# 1부터 20까지의 짝수들로 이루어진 리스트를 ㅁ나드시오
even_nums = [x for x in range(1,21) if x % 2 ==0]
print(f"2번결과, {even_nums}")

# 각 문자열을 분리해서 대문자로 변환된 리스트를 만드시오
word = "hello"
upper_letters = [ x.upper() for x in word]
print(f"3번결과, {upper_letters}")

#글자의 길이가 3글자 이하인 단어만 남기시오
words =["apple", "banana", "cherry", "egg", "grape"]
short_words = [x for x in words if len(x) <= 3]
print(f"4번결과, {short_words}")
