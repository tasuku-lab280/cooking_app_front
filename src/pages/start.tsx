import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { LoadingOverlay, Button } from '@mantine/core';

import { useAppDispatch } from 'hooks/useStore';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { login } from 'services/redux/slices/currentUserSlice';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($email: String!, $nickname: String!) {
    createUser(input: { email: $email, nickname: $nickname }) {
      result
      user {
        id
        email
        nickname
      }
    }
  }
`;

const Start: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isFetchng, setIsFetchng] = useState(true);
  const { currentUser, loading } = useCurrentUser();
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  useEffect(() => {
    if (loading) return;

    if (currentUser) {
      dispatch(
        login({
          id: currentUser.id,
          email: currentUser.email,
          nickname: currentUser.nickname,
          isLoggedIn: true,
        })
      );
      router.push('/');
    }

    if (!currentUser) setIsFetchng(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loading]);

  const onClickCreateUser = async () => {
    try {
      const createUserData = await createUser({
        variables: { nickname: 'test', email: 'test@example.com' },
      });

      const { id, email, nickname } = createUserData.data.createUser.user;
      dispatch(login({ id, email, nickname, isLoggedIn: true }));
      router.push('/');
    } catch (error) {
      alert(`システムエラーが発生しました。\n${error}`);
    }
  };

  if (loading || isFetchng) return <LoadingOverlay visible />;

  return (
    <>
      <Button onClick={onClickCreateUser}>アカウント作成</Button>
    </>
  );
};

export default Start;
