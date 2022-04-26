import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { LoadingOverlay } from '@mantine/core';

import { useCurrentUser } from 'hooks/useCurrentUser';

type Props = {
  children: React.ReactNode;
};

const START_PATH = '/callback';

const UserController = ({ children }: Props) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  const isStartPath = useMemo(() => {
    return router.pathname === START_PATH;
  }, [router.pathname]);

  useEffect(() => {
    if (loading) return;
    (async () => {
      if (currentUser && isStartPath) return router.push('/');
      if (!currentUser && !isStartPath) return router.push(START_PATH);
    })();
  }, [router, currentUser, loading, isStartPath]);

  if (currentUser || isStartPath) {
    return <>{children}</>;
  }

  return <LoadingOverlay visible />;
};

export const withCurrentUser = (Component: NextPage) => {
  const PrivateRoute = () => {
    return (
      <UserController>
        <Component />
      </UserController>
    );
  };

  return withAuthenticationRequired(PrivateRoute, {
    onRedirecting: () => <LoadingOverlay visible />,
  });
};
