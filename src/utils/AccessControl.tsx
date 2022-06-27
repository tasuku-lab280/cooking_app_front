import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import { LoadingOverlay } from '@mantine/core';

import { START_PATH } from 'constants/routeName';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useAppSelector, useAppDispatch } from 'hooks/useStore';
import { login } from 'services/redux';

const WHITE_LIST_PAGES = [START_PATH, '/404'];

type Props = { children: React.ReactNode };

// アクセス制御
export const AccessControl = ({ children }: Props) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth0();
  const isLoggedIn = useAppSelector((state) => state.currentUser.isLoggedIn);

  const isWhiteListPage = useMemo(() => {
    return WHITE_LIST_PAGES.includes(router.pathname);
  }, [router.pathname]);

  if (isLoading) return <LoadingOverlay visible />;

  if (!isAuthenticated || isWhiteListPage) return <>{children}</>;

  if (isAuthenticated && !isLoggedIn) {
    return <CheckUserRegistered>{children}</CheckUserRegistered>;
  }

  return <>{children}</>;
};

// API側のユーザー登録可否チェック
const CheckUserRegistered = ({ children }: Props) => {
  const [isExecuting, setIsExecuting] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser, loading } = useCurrentUser();

  useEffect(() => {
    (async () => {
      if (loading) return;

      if (currentUser) {
        const { id, accountId, nickname } = currentUser;
        dispatch(login({ id, accountId, nickname, isLoggedIn: true }));
      } else {
        await router.push(START_PATH);
      }

      setIsExecuting(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loading]);

  if (loading || isExecuting) return <LoadingOverlay visible />;

  return <>{children}</>;
};
