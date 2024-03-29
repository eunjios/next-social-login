import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import queryClient from '@/store/queryClient';
import '@/styles/globals.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}
