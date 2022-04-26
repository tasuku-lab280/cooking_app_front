import type { AppProps } from 'next/app';

import { Auth0Provider } from 'services/auth0/Auth0Provider';
import { ApolloProvider } from 'services/graphql/ApolloProvider';
import { ReduxProvider } from 'services/redux/ReduxProvider';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <Auth0Provider>
        <ApolloProvider>
          <Component {...pageProps} />
        </ApolloProvider>
      </Auth0Provider>
    </ReduxProvider>
  );
};

export default MyApp;
