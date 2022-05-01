import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import {
  Grid,
  TextInput,
  Textarea,
  Text,
  Center,
  Button,
  MultiSelect,
  InputWrapper,
  Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

import { CreateRecipeMutation } from 'services/graphql/types/generated';
import { useCategory } from 'hooks/useCategory';
import { BaseLayout } from 'layouts/BaseLayout';
import { ImageUpload } from 'components/forms/ImageUpload';
import { withCurrentUser } from 'utils/withCurrentUser';

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      errors
    }
  }
`;

type Params = {
  status: boolean;
  name: string;
  description: string;
  // picture: string | null;
  reference: string;
  categoryIds: string[];
};

const RecipeNew: NextPage = () => {
  const router = useRouter();
  const [toggle, setToggle] = useToggle(true, [true, false]);
  const isSmallScreen = useMediaQuery('(max-width: 1200px)');

  const { data: categoryData, loading: categoryLoading } = useCategory();
  const categoryList =
    categoryLoading || !categoryData
      ? []
      : categoryData.categories.map((c) => {
          return { value: c.id, label: c.name };
        });

  const form = useForm({
    initialValues: {
      status: true,
      name: '',
      description: '',
      // picture: null,
      reference: '',
      categoryIds: [],
    },
    validate: {
      name: (value) =>
        value.length < 32 ? null : 'レシピ名は32文字以内にしてください',
      categoryIds: (value) =>
        value.length > 0 ? null : 'カテゴリは1つ以上選択してください',
    },
  });

  const onSubmit = (values: Params) => {
    console.log(values);

    createRecipe({
      variables: {
        input: {
          input: {
            ...values,
            status: values.status ? 'public' : 'private',
          },
        },
      },
    });
  };

  const [createRecipe, { loading: createRecipeLoading }] =
    useMutation<CreateRecipeMutation>(CREATE_RECIPE_MUTATION, {
      onCompleted: async (data) => {
        const createRecipeData = data.createRecipe;

        // バリデーションエラー
        if (createRecipeData?.errors) {
          showNotification({
            title: 'レシピ登録に失敗しました。入力内容を再確認してください。',
            message: `${createRecipeData.errors.join('。')}`,
            color: 'red',
            autoClose: false,
          });
          return;
        }

        // 正常処理
        await router.push('/');
        showNotification({
          title: 'レシピを登録しました！',
          message: 'hogehoge',
          color: 'teal',
          autoClose: 10000,
        });
      },
      onError: (error) => {
        alert(`システムエラーが発生しました。\n${error}`);
      },
    });

  return (
    <BaseLayout>
      <Center>
        <Text size="xl" weight={800} mb={20}>
          レシピを登録する
        </Text>
      </Center>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Grid>
          <Grid.Col lg={8}>
            <TextInput
              label="レシピ名"
              placeholder="例) 豚キムチ"
              required
              classNames={{ label: 'font-bold' }}
              {...form.getInputProps('name')}
            />
            <Textarea
              label="材料と作り方"
              placeholder="具体的なレシピの作り方を記入してください"
              required
              autosize
              minRows={7}
              mt={20}
              classNames={{ label: 'font-bold' }}
              {...form.getInputProps('description')}
            />
            <MultiSelect
              label="タグ"
              placeholder="1つ以上選択してください（最大3つまで）"
              nothingFound="Nothing found"
              required
              searchable
              clearable
              data={categoryList}
              maxSelectedValues={3}
              mt={20}
              classNames={{ label: 'font-bold' }}
              {...form.getInputProps('categoryIds')}
            />
            <Textarea
              label="参考にしたレシピ（任意）"
              placeholder="参考にした書籍、URLなどを記入してください"
              minRows={2}
              mt={20}
              classNames={{ label: 'font-bold' }}
              {...form.getInputProps('reference')}
            />
            <Switch
              label="このレシピを公開する"
              color="teal"
              checked={toggle}
              onClick={() => setToggle()}
              mt={20}
              classNames={{ label: 'font-bold' }}
              {...form.getInputProps('status')}
            />
          </Grid.Col>
          <Grid.Col
            lg={4}
            classNames={{ root: isSmallScreen ? 'order-first' : '' }}
          >
            <InputWrapper
              label="写真"
              required
              classNames={{ label: 'font-bold' }}
            >
              <ImageUpload />
            </InputWrapper>
          </Grid.Col>
        </Grid>
        <Button
          type="submit"
          color="teal"
          fullWidth
          disabled={createRecipeLoading}
          loading={createRecipeLoading}
          my={50}
        >
          レシピを登録する
        </Button>
      </form>
    </BaseLayout>
  );
};

export default withCurrentUser(RecipeNew);
