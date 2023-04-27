import { type AppProps } from 'next/app';
import { Layout } from '~/components/global';
import { trpc } from '~/utils/trpc';

import '~/styles/globals.css';

export default trpc.withTRPC(function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
});
