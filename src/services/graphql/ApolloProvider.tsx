import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { useAuth0 } from '@auth0/auth0-react';
import { setContext } from '@apollo/client/link/context';

type Props = {
  children: React.ReactNode;
};

export const ApolloProvider = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();

  const authLink = setContext(async (_, { headers }) => {
    const token = await getAccessTokenSilently();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
  });

  const client = new ApolloClient({
    //@ts-ignore
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <Provider client={client}>{children}</Provider>;
};
