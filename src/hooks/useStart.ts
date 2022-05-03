import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { showNotification } from '@mantine/notifications';

import { useCurrentUser } from 'hooks/useCurrentUser';
import { useAppDispatch } from 'hooks/useStore';
import { CreateUserMutation } from 'services/graphql/types/generated';
import { login } from 'services/redux';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($accountId: String!, $nickname: String!) {
    createUser(input: { accountId: $accountId, nickname: $nickname }) {
      user {
        id
        accountId
        nickname
      }
      errors
    }
  }
`;

export const useStart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { currentUser, loading: currentUserLoading } = useCurrentUser();
  const [isExecuting, setIsExecuting] = useState(true);
  const loading = currentUserLoading || isExecuting;

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
          const { id, accountId, nickname } = createUserData.user;
          dispatch(login({ id, accountId, nickname, isLoggedIn: true }));
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
    (async () => {
      if (currentUserLoading) return;

      if (currentUser) {
        const { id, accountId, nickname } = currentUser;
        dispatch(login({ id, accountId, nickname, isLoggedIn: true }));
        await router.push('/');
      }

      setIsExecuting(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, currentUserLoading]);

  return { loading, createUser, createUserLoading };
};
