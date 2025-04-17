my_list = [1,2,3,4,5,6]
print(my_list)
print(len(my_list))

print(my_list[4])
#파이선은 음수 인덱스로 역순 참조 가능.
print(my_list[-6])

#슬라이싱
print("[1:3] =",my_list[1:3])
print("[:3] =",my_list[:3])
print("[3:] =",my_list[3:])

#리스트 추가
my_list.append(7)
print(my_list)

my_list.insert(2,99)
print(my_list)

my_list.remove(99)
print(my_list)

popped = my_list.pop(3)
print(popped)
print(my_list)

popped = my_list.pop()
print(popped)
print(my_list)

#리스트 컴프리헨션
#맨 앞의 변수로 이 리스트를 채울거다.
#뒷 변수는 x 가 만들어지는 조건
numbers = [x for x in range(10)]
print(numbers)

numbers = [x for x in range(1,5)]
print(numbers)

numbers = [x**2 for x in range(10) if x % 2 ==0]
print(numbers)