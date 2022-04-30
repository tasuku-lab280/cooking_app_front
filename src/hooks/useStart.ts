import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { showNotification } from '@mantine/notifications';

import { useAppDispatch } from 'hooks/useStore';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { CreateUserMutation } from 'services/graphql/types/generated';
import { login } from 'services/redux/slices/currentUserSlice';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($email: String!, $nickname: String!) {
    createUser(input: { email: $email, nickname: $nickname }) {
      user {
        id
        email
        nickname
      }
      errors
    }
  }
`;

export const useStart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isFetchng, setIsFetchng] = useState(true);
  const { currentUser, loading: currentUserLoading } = useCurrentUser();
  const [createUser, { loading: createUserLoading }] =
    useMutation<CreateUserMutation>(CREATE_USER_MUTATION, {
      onCompleted: async (data) => {
        const createUserData = data.createUser;

        // バリデーションエラー
        if (createUserData?.errors) {
          showNotification({
            title:
              'アカウント登録に失敗しました。入力内容を再確認してください。',
            message: `${createUserData.errors.join('。')}`,
            color: 'red',
            autoClose: false,
          });
          return;
        }

        // 正常処理
        if (createUserData?.user) {
          const { id, email, nickname } = createUserData.user;
          dispatch(login({ id, email, nickname, isLoggedIn: true }));
          await router.push('/');
          showNotification({
            title: 'アカウント登録しました！',
            message: '早速レシピを登録してみましょう！',
            color: 'teal',
            autoClose: 20000,
          });
          return;
        }

        // システムエラー
        throw new Error();
      },
      onError: (error) => {
        alert(`システムエラーが発生しました。\n${error}`);
      },
    });

  useEffect(() => {
    if (currentUserLoading) return;

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
  }, [currentUser, currentUserLoading]);

  const loading = currentUserLoading || isFetchng;

  return { loading, createUser, createUserLoading };
};
