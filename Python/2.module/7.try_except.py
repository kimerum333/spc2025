
try:
    result = 10.0
except ZeroDivisionError:
    print('zero')

print('다음거 실행가능')

def convert_str_to_int(string):
    try:
        result = int(string)
        return result
    except Exception as e:
        print("에러 발생", e)

result=convert_str_to_int("10")
print("변환된숫자",result)

result=convert_str_to_int("hello")
print("변환된 숫자: ", result)