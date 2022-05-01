import type { NextPage } from 'next';
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
import { useToggle } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';

import { BaseLayout } from 'layouts/BaseLayout';
import { ImageUpload } from 'components/forms/ImageUpload';
import { withCurrentUser } from 'utils/withCurrentUser';

const RecipeNew: NextPage = () => {
  const [toggle, setToggle] = useToggle(true, [true, false]);
  const isSmallScreen = useMediaQuery('(max-width: 1200px)');

  return (
    <BaseLayout>
      <Center>
        <Text size="xl" weight={800} mb={20}>
          レシピを登録する
        </Text>
      </Center>
      <Grid>
        <Grid.Col lg={8}>
          <TextInput
            label="レシピ名"
            placeholder="例) 豚キムチ"
            required
            classNames={{ label: 'font-bold' }}
          />
          <Textarea
            label="材料と作り方"
            placeholder="具体的なレシピの作り方を記入してください"
            required
            autosize
            minRows={7}
            mt={20}
            classNames={{ label: 'font-bold' }}
          />
          <MultiSelect
            label="タグ"
            placeholder="1つ以上選択してください（最大3つまで）"
            nothingFound="Nothing found"
            required
            searchable
            data={[
              'React',
              'Angular',
              'Svelte',
              'Vue',
              'Riot',
              'Next.js',
              'Blitz.js',
            ]}
            mt={20}
            classNames={{ label: 'font-bold' }}
          />
          <Textarea
            label="参考にしたレシピ（任意）"
            placeholder="参考にした書籍、URLなどを記入してください"
            minRows={2}
            mt={20}
            classNames={{ label: 'font-bold' }}
          />
          <Switch
            label="このレシピを公開する"
            color="teal"
            checked={toggle}
            onClick={() => setToggle()}
            mt={20}
            classNames={{ label: 'font-bold' }}
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
      <Button color="teal" fullWidth mt={50}>
        レシピを登録する
      </Button>
    </BaseLayout>
  );
};

export default withCurrentUser(RecipeNew);
