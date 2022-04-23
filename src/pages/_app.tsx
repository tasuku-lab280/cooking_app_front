import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { Auth0Provider } from 'services/auth0/Auth0Provider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider>
      <Component {...pageProps} />
    </Auth0Provider>
  );
};

export default MyApp;
