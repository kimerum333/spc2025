my_dict={
    "name":"Alice",
    "age":25,
    "location": "Seoul"
}

print(my_dict)
print("이름은: ", my_dict["name"])
print("나이는: ", my_dict["age"])

#딕셔너리는 재할당이 가능.
my_dict["age"] = 30;
print("나이는: ", my_dict["age"])

#딕셔너리는 추가 할당도 가능.
my_dict["car"] = "현대 K5"
print(my_dict)

#순회하기
key_list = list(my_dict.keys())
print('키들은 : ',key_list)

value_list = list(my_dict.values())
print('값들은 : ',value_list)

for key,value in my_dict.items():
    print(f"키: {key}. 값: {value}")