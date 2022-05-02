import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { LoadingOverlay } from '@mantine/core';

import { START_PATH } from 'constants/routeName';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { login } from 'services/redux';
import { useAppSelector, useAppDispatch } from 'hooks/useStore';

// アクセス制御
export const withCurrentUser = (Component: NextPage) => {
  const PrivateRoute = () => {
    return (
      <RequestState>
        <Component />
      </RequestState>
    );
  };

  return withAuthenticationRequired(PrivateRoute, {
    onRedirecting: () => <LoadingOverlay visible />,
  });
};

type Props = {
  children: React.ReactNode;
};

// storeの認証情報をチェック
const RequestState = ({ children }: Props) => {
  const isLoggedIn = useAppSelector((state) => state.currentUser.isLoggedIn);

  if (isLoggedIn) return <>{children}</>;
  return <RequestApi>{children}</RequestApi>;
};

// APIサーバの認証情報をチェック
const RequestApi = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, loading } = useCurrentUser();

  useEffect(() => {
    const controlAccess = async () => {
      if (loading) return;

      // アカウント未登録
      if (!currentUser) return router.push(START_PATH);

      // アカウント登録済
      if (currentUser) {
        const { id, accountId, nickname } = currentUser;
        return dispatch(login({ id, accountId, nickname, isLoggedIn: true }));
      }
    };
    controlAccess();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loading]);

  if (loading) return <LoadingOverlay visible />;

  return <>{children}</>;
};
