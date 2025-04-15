# 웹서비스 개발

# 프론트엔드
## HTML
웹 문서의 뼈대. "컨텐츠"

## CSS
디자인 담당. 기술적으로는 셀렉터가 중요.
### 셀렉터
id(#), class(.), tag
### 박스 모델
마진 보더 패딩 콘텐츠 / 마보패콘

### JS
동적으로 요소를 변경하기 위해서.
그럼 동적이지 않은건? => Static

---

# 네트워크

## 프로토콜
프론트엔드와 백엔드가 통신하기 위한 프로토콜은? HTTP, TCP/IP

## Http
HyperText Transfer Protocol. HTML을 전달하기 위해 존재.

### HTTP메서드
get : read
post : create
put : update
delete  : delete

---

# 포트 주소

| 포트 | 프로토콜 | 서비스 / 애플리케이션 | 설명 |
|------|----------|------------------------|------|
| 20   | TCP      | FTP (데이터)           | 파일 전송 프로토콜의 데이터 채널 |
| 21   | TCP      | FTP (제어)             | FTP 명령 제어 채널 |
| 22   | TCP      | SSH                    | 원격 터미널 접속, Git SSH 등 |
| 23   | TCP      | Telnet                 | 텍스트 기반 원격 접속 (보안 취약) |
| 25   | TCP      | SMTP                   | 이메일 송신 (메일 서버 간 전달) |
| 53   | UDP/TCP  | DNS                    | 도메인 이름 → IP 변환 |
| 67   | UDP      | DHCP (서버)            | IP 자동 할당 프로토콜 (서버측 포트) |
| 68   | UDP      | DHCP (클라이언트)      | 클라이언트 측 포트 |
| 80   | TCP      | HTTP                   | 비암호화 웹 트래픽 (기본 웹) |
| 110  | TCP      | POP3                   | 이메일 수신 (오래된 방식) |
| 143  | TCP      | IMAP                   | 이메일 수신 (동기화 방식) |
| 161  | UDP      | SNMP                   | 네트워크 장비 모니터링/관리 |
| 443  | TCP      | HTTPS                  | 보안 웹 트래픽 (SSL/TLS 암호화) |
| 465  | TCP      | SMTPS                  | SSL 기반 이메일 송신 |
| 587  | TCP      | SMTP (메일 클라이언트용) | 보안 송신용 SMTP |
| 993  | TCP      | IMAPS                  | SSL 기반 이메일 수신 |
| 995  | TCP      | POP3S                  | SSL 기반 POP3 |
| 1433 | TCP      | MS SQL Server          | 마이크로소프트 SQL DB 서버 |
| 1521 | TCP      | Oracle DB              | 오라클 데이터베이스 연결 |
| 3306 | TCP      | MySQL/MariaDB          | 오픈소스 관계형 데이터베이스 |
| 5432 | TCP      | PostgreSQL             | 고급 관계형 데이터베이스 |
| 6379 | TCP      | Redis                  | 인메모리 Key-Value 저장소 |
| 11211| TCP/UDP  | Memcached              | 인메모리 캐시 서버 |
| 27017| TCP      | MongoDB                | NoSQL 문서형 데이터베이스 |
| 8000 | TCP      | 개발용 웹서버          | Django, Uvicorn 등에서 기본 사용 |
| 8080 | TCP      | 톰캣, 프록시 서버      | HTTP 대체 포트 (80 충돌 회피용) |
| 8443 | TCP      | HTTPS (대체 포트)      | 443 대신 쓰이는 보안 웹 포트 |
| 3000 | TCP      | Node.js (Express, React 등) | 프론트/백엔드 개발자들이 많이 사용하는 기본 포트 |
| 5173 | TCP      | Vite 개발 서버         | 프론트엔드(Vite) 핫리로드용 |

## URL 구조
https:// 스키마
search. 서브도메인
naver.com/ 메인도메인
search.naver? path
where=nexearch$ 쿼리 파라미터
sm=top_hty&

---

# 벡엔드

누가 요청할 때까지 기다린다 ( listen / ip:port )
port 는 유니크해야 함.

** 클라이언트의 요청 URL, HTTP method **

# npm js
메이븐 레포지토리에 해당. 패키지관리자인 npm이 해준다.


# import 방법

## Common JS 방식
const fs = require('fs');

## ES6
import ... from ...
=> type: module 작성 필요.

# 미들웨어
익스프레스에서 예시들자면, app.use
