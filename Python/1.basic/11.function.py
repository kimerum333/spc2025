def greet(name):
    print (f"hello, {name}")
    #리턴값 없다

greet('Alice')

def add(x,y):
    print(x)
    return x+y

result = add(2,3)
print(result)


#함수의 기본값
def greet_default(name="Guest"):
    print(f"Hello, {name}")

greet_default('John')
greet_default()


#함수 인자 위치 지정도 가능
def example(a,b,c):
    print(f"a:{a}, b:{b}, c:{c}")

example(1,2,3)
example(a=1,b=2,c=3)
#인자 순서가 바뀌어도 명확히 이름을 넣어주면 제대로 들어간다!
example(a=1,c=3,b=2)

def print_gugudan(dan):
    print(f"{dan}단")
    for i in range(1,10):
        print(f"{dan} x {i} = {dan*i} ")

print_gugudan(5)

def print_gugu_all():
    for i in range(2,10):
        print(f"{i}단")
        for j in range(1,10):
            print(f"{i} x {j} = {i*j} ")
            
print_gugu_all()
