def function_a1():
    print('module_a : function_a1 호출됨')
    function_a2()

def function_a2():
    print('module_a : function_a2 호출됨')
    function_a3()

def function_a3():
    print('module_a : function_a3 호출됨')
    function_hello()

def function_hello():
    print('module_a : function_hello 호출됨')
    function_goodbye()

def function_goodbye():
    print('module_a : function_goodbye 호출됨')
    raise RuntimeError("의도적으로 에러발생하기")

if __name__ == '__main__':
    print('module_a 의 메인함수 시작')

function_a1()