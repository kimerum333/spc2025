# 

x = 5
y = "Hello"
z = [1,2,3]
k = True


print(type(x))
print(type(y))
print(type(z))
print(type(k))


print(isinstance(x,int))
print(isinstance(x,str))


class A:
    pass

#B라는 객체는 A를 상속받는다. B extends A
class B(A):
    pass

class C:
    pass

#객체의 인스턴스화
b=B()
print(isinstance(b,A))
print(isinstance(b,B))
print(isinstance(b,C))

a=A()
print(isinstance(a,A))
print(isinstance(a,B))
print(isinstance(a,C))
