import nextAuth, { NextAuthOptions } from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { getUser, insertUser } from '@/utils/db';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (
        account?.provider === 'naver' ||
        account?.provider === 'kakao' ||
        account?.provider === 'google'
      ) {
        const existingUser = await getUser(user.id);
        if (!existingUser) {
          await insertUser(user); // sign up
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token && token.accessToken) {
        // set user
        session.user = {
          id: token.sub,
          message: (token.message as string) ?? null,
          image: token.picture ?? '',
          email: token.email ?? '',
          name: token.name ?? '',
        };
        session.accessToken = token.accessToken as string;
        session.provider = (token.provider as string) ?? '';

        // set message, email for existing user
        const existingUser = await getUser(token.sub ?? '');
        if (existingUser) {
          if (session.user) {
            session.user.message = existingUser.message ?? '';
            session.user.email = existingUser.email ?? '';
          }
        }
      }
      return session;
    },
  },
};

export default nextAuth(authOptions);
