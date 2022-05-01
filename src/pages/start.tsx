import type { NextPage } from 'next';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  Container,
  Center,
  Text,
  TextInput,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { useStart } from 'hooks/useStart';

type Params = {
  nickname: string;
  accountId: string;
};

const Start: NextPage = () => {
  const { logout } = useAuth0();
  const { loading, createUser, createUserLoading } = useStart();

  const form = useForm({
    initialValues: {
      nickname: '',
      accountId: '',
    },
    validate: {
      nickname: (value) =>
        value.length < 32 ? null : 'ニックネームは32文字以内にしてください',
      accountId: (value) =>
        value.length < 32 ? null : 'アカウントIDは32文字以内にしてください',
    },
  });

  const onSubmit = (values: Params) => {
    const { nickname, accountId } = values;
    createUser({ variables: { nickname, accountId } });
  };

  if (loading) return <LoadingOverlay visible />;

  return (
    <Container size="sm" px="xs" className="mt-20">
      <Center>
        <Text size="xl" weight={800} className="mb-16">
          アカウント登録
        </Text>
      </Center>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          required
          size="lg"
          label="ニックネーム"
          placeholder="ニックネーム"
          className="mb-8"
          classNames={{ label: 'font-bold' }}
          {...form.getInputProps('nickname')}
        />
        <TextInput
          required
          size="lg"
          label="アカウントID"
          placeholder="アカウントID"
          classNames={{ label: 'font-bold' }}
          {...form.getInputProps('accountId')}
        />
        <Center className="mt-16">
          <Button
            type="submit"
            color="teal"
            fullWidth
            size="md"
            disabled={createUserLoading}
            loading={createUserLoading}
          >
            アカウント登録する
          </Button>
        </Center>
        <Center className="mt-8">
          <Button
            color="red"
            fullWidth
            variant="outline"
            size="md"
            disabled={createUserLoading}
            onClick={() => logout()}
          >
            ログアウト
          </Button>
        </Center>
      </form>
    </Container>
  );
};

export default Start;
