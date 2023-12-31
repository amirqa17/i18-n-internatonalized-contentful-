// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // adjust the path to your i18n configuration file

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nextProvider>
  );
}

export default MyApp;
