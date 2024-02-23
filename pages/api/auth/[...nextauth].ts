import NextAuth, { NextAuthOptions } from 'next-auth';
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
        account &&
        (account?.provider === 'naver' ||
          account?.provider === 'kakao' ||
          account?.provider === 'google')
      ) {
        try {
          const existingUser = await getUser(user.id);

          if (!existingUser) {
            await insertUser(user); // sign up
          }
        } catch (error) {
          console.error(`Failed to sign in with ${account.provider}`, error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && account.access_token) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = {
        id: token.sub ?? '',
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
