import { DefaultSession } from 'next-auth';

// acceessToken 프로퍼티 타입을 추가함
declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
  }
}
