import { Auth0Provider as Provider } from '@auth0/auth0-react';

type Props = {
  children: React.ReactNode;
};

const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
const audience = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const redirectUri = process.env.NEXT_PUBLIC_BASE_URL || '';

export const Auth0Provider = ({ children }: Props) => {
  return (
    <Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={redirectUri}
    >
      {children}
    </Provider>
  );
};
