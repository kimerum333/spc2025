# flask?
js 의 express 처럼 경량 WAS

# 라우팅
## 예시
@app.route('/user')
@app.route('/user/<int:user_id>')
def user(user_id=1):
    return f'<h1>유저 페이지</h1><p>환영합니다. {user_id}</p>'  

하나의 엔드포인트를 여러개의 http엔드포인트에 매칭 가능.
파라미터 인자에 타입힌트를 줄 수도 있다.


# 프론트엔드
내가 파일을 그냥 줄건가? 아니면 템플릿 엔진으로 렌더링해서 줄거냐?
js 템플릿 엔진들 : pug, ejs, nunjucks

jinja2 template 문법
{{}} 더블 중괄호를 사용해서 
{% %} 또는 이런 퍼센트 중괄호를 사용해서 템플릿 엔진이 변수를 전달받아 렌더링을 해준다.

# MVT 패턴?
모델 뷰 템플릿
dv  일반로직 프론트엔드

# AWS 자격증 시험 50% 할인쿠폰 (2025년 5월 21일까지)				"
 1. Cloud Practitioner => 매우쉽다. 3일정도 책보면 가능. 업계에서 그래서 인정도 잘 안해줌.
 2. AI Practitioner
 3. Solutions Architect - Associate => 업계에서 그래도 인정해주는 것. 150 불쯤. 75불? 이건 1~2주는 책을 봐야 함. 적어도 클라우드에서 hello world 는 해본것.
 4. Developer - Associate
 5. SysOps Administrator - Associate
 6. Data Engineer - Associate
 7. Machine Learning Engineer - Associate"				
	https://pages.awscloud.com/GLOBAL-other-GC-Traincert-Foundational-and-Associate-Certification-Challenge-2025-reg.html							