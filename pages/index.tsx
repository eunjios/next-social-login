import Head from 'next/head';
import Form from '@/components/form/Form';

export default function Home() {
  return (
    <>
      <Head>
        <title>소셜 로그인</title>
        <meta name="description" content="소셜 로그인 연습하기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Form />
      </main>
    </>
  );
}
