import type { AppProps } from 'next/app';
import Head from 'next/head';
import { I18nProvider } from '../lib/i18n';
import { ReactQueryProvider } from '../lib/react-query';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <I18nProvider>
        <Head>
          <title>Beauty Booking Hub</title>
        </Head>
        <Component {...pageProps} />
      </I18nProvider>
    </ReactQueryProvider>
  );
}
