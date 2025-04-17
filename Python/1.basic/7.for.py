numbers = [1,2,3,4,5,6,7]

for num in numbers:
    print(num)


for num in numbers:
    if num % 2 == 0 :
        print(f"숫자 {num} 는 짝수입니다.")
    else:  
        print(f"숫자 {num} 는 홀수입니다.")

even_numbers=[]
for num in numbers:
    if num % 2 ==0:
        even_numbers.append(num)

print("원래 목록은:" , numbers)
print("짝수 목록은:" , even_numbers)

students = {"John":85,"James":75,"Julia":100,"Sophie":65}
for name,score in students.items():
    if score>80:
        print(f"{name} 은 합격입니다.")
    elif score<=80:
        print(f"{name} 은 불합격입니다. 점수 : {score}")