import type { AppProps } from 'next/app';

import { Auth0Provider } from 'services/auth0';
import { ApolloProvider } from 'services/graphql';
import { MantineProvider } from 'services/mantine';
import { ReduxProvider } from 'services/redux';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <Auth0Provider>
        <ApolloProvider>
          <MantineProvider>
            <Component {...pageProps} />
          </MantineProvider>
        </ApolloProvider>
      </Auth0Provider>
    </ReduxProvider>
  );
};

export default MyApp;
