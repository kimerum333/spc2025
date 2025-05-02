# 서버리스?

## 람다
물리적인 vm 이 있는거는 아니고, 내가 함수 만들어서 올리면 어딘가에서 연산되서 결과가 도출된다...

## API Gateway
내가 CRUD 인터페이스를 설계하면 내 서버가 없는데 뒷단에서 람다를 통해 CRUD가 일어난다. DB도 빌려쓴다.

## 예시
- s3 에 정적 컨텐츠 업로드 (html, css, js)
- amazon cognito 로 auth
- 아마존 db 빌려서 rdb로 사용
- 필요할 때만 api gateway 랑 람다로 CRUD

