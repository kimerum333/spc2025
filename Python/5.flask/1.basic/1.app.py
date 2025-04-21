from flask import Flask, request

# 이 파이선 파일네임이 __name__ 약간 리플렉션같은 문법이구나
app = Flask(__name__)

@app.route('/')
def home():
    return '<h1>Hello, flask!</h1>'

#경로 파라미터 처리
@app.route('/user')
@app.route('/user/<int:user_id>')
def user(user_id=1):
    return f'<h1>유저 페이지</h1><p>환영합니다. {user_id}</p>'    

@app.route('/admin')
@app.route('/admin/<username>')
def admin(username='Guest'):
    return f'<h1>관리자 페이지 {username}</h1>'


#쿼리파라미터 처리
#플라스크
@app.route('/search')
def search():
    query = request.args.get("q")
    page = request.args.get("page")

    return f"검색중, 키워드 : {query}, 페이지 : {page}"


if __name__ == '__main__': #파이썬의 메인 함수. 내 파일을 실행했을 시 호출. 임포트될 시에는 실행되지 않는다.
    app.run()

#보통 플라스크는 5000번 포트로 여는게 컨벤션이다.
#익스프레스와 달리 딱히 모건 같은 라이브러리를 따로 가져오지 않더라도 기본적으로 로그가 찍히고 있다!