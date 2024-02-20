import Head from 'next/head';
import User from '@/components/user/User';
import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export default function Home({ data }: { data: Session }) {
  return (
    <>
      <Head>
        <title>소셜 로그인</title>
        <meta name="description" content="소셜 로그인 연습하기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <User data={data} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  console.log('getServerSideProps', session);

  // unauthenticated user
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { data: session },
  };
};
