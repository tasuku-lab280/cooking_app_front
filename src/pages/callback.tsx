import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { LoadingOverlay } from '@mantine/core';

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    currentUser {
      id
      email
      nickname
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($email: String!, $nickname: String!) {
    updateUser(input: { email: $email, nickname: $nickname }) {
      result
    }
  }
`;

const Callback: NextPage = () => {
  const router = useRouter();

  const { user, isLoading: authIsLoading } = useAuth0();

  const [fetchCurrentUser] = useLazyQuery(CURRENT_USER_QUERY);

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  useEffect(() => {
    if (!user || authIsLoading) return;

    (async () => {
      try {
        const res = await fetchCurrentUser();
        const { email, nickname } = res.data.currentUser;
        if (email && nickname) return router.push('/');

        await updateUser({
          variables: { email: user.email, nickname: user.nickname },
        });
        router.push('/');
      } catch (error) {
        alert(`システムエラーが発生しました。\n${error}`);
      }
    })();
  }, [router, user, authIsLoading, fetchCurrentUser, updateUser]);

  return <LoadingOverlay visible />;
};

export default Callback;
