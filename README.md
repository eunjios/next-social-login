# Social Login (NextAuth.js + MongoDB)

> 네이버, 카카오, 구글 계정으로 소셜 로그인 구현하기

## About

### 주요 기능

1. 네이버, 카카오, 구글 계정으로 **소셜 로그인**
2. 처음 방문한 유저는 DB에 저장
3. 로그인 providers가 제공하지 않는 데이터도 DB에 저장 (상태 메시지, 이메일 정보)

### 기술

- Next.js (Pages Router)
- React
- NextAuth.js
- MongoDB
- Module CSS

## Getting Started

1. Repository 클론

```bash
git clone https://github.com/eunjios/next-social-login.git
```

2. Dependencies 설치

```bash
yarn install
```

3. 애플리케이션 실행

```bash
yarn dev
```

## 환경 변수

The following environment variables are used by the application:

| Variable               | Description                               |
| ---------------------- | ----------------------------------------- |
| `NEXTAUTH_URL`         | Base URL of your Next.js application      |
| `NEXTAUTH_SECRET`      | Strong secret key used for signing tokens |
| `MONGODB_URI`          | MongoDB connection string                 |
| `GOOGLE_CLIENT_ID`     | Google Client ID                          |
| `GOOGLE_CLIENT_SECRET` | Google Client Secret                      |
| `KAKAO_CLIENT_ID`      | Kakao Client ID                           |
| `KAKAO_CLIENT_SECRET`  | Kakao Client Secret                       |
| `NAVER_CLIENT_ID`      | Naver Client ID                           |
| `NAVER_CLIENT_SECRET`  | Naver Client Secret                       |

To set these environment variables, create a `.env.local` file in the root directory of the project and add the environment variables.
