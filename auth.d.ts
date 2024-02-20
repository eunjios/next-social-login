import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      id?: string | null;
      message?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string | null;
    provider?: string | null;
  }
}
