import type { AppProps } from 'next/app';

import { Auth0Provider } from 'services/auth0';
import { ApolloProvider } from 'services/graphql';
import { MantineProvider } from 'services/mantine';
import { ReduxProvider } from 'services/redux';
import { AccessControl } from 'utils/AccessControl';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <Auth0Provider>
        <ApolloProvider>
          <MantineProvider>
            <AccessControl>
              <Component {...pageProps} />
            </AccessControl>
          </MantineProvider>
        </ApolloProvider>
      </Auth0Provider>
    </ReduxProvider>
  );
};

export default MyApp;
