import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { Auth0Provider } from 'services/auth0/Auth0Provider';
import { ApolloProvider } from 'services/graphql/ApolloProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider>
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </Auth0Provider>
  );
};

export default MyApp;
