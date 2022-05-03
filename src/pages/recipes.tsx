import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import {
  Grid,
  MultiSelect,
  Loader,
  TextInput,
  Text,
  Center,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { RecipeItem } from 'components/RecipeItem';
import { useCategory } from 'hooks/useCategory';
import { BaseLayout } from 'layouts/BaseLayout';
import { RecipesQuery } from 'services/graphql/types/generated';

const RECIPES_QUERY = gql`
  query RecipesQuery($keyword: String, $categoryIds: [String!]) {
    recipes(keyword: $keyword, categoryIds: $categoryIds) {
      id
      name
      picture
      createdAtText
      likeCount
      favoriteCount
      user {
        id
        nickname
        icon
      }
      categories {
        id
        name
      }
    }
  }
`;

const Recipes: NextPage = () => {
  const {
    data: recipesData,
    loading: recipesLoading,
    refetch,
  } = useQuery<RecipesQuery>(RECIPES_QUERY, {
    variables: { keyword: '', categoryIds: [] },
    notifyOnNetworkStatusChange: true,
  });

  const { data: categoryData, loading: categoryLoading } = useCategory();
  const categoryList =
    categoryLoading || !categoryData
      ? []
      : categoryData.categories.map((c) => {
          return { value: c.id, label: c.name };
        });

  const form = useForm({
    initialValues: {
      keyword: '',
      categoryIds: [],
    },
  });

  const refetchRecipes = () => {
    const { keyword, categoryIds } = form.values;
    refetch({ keyword, categoryIds });
  };

  return (
    <BaseLayout>
      <Grid align="flex-end" mb={25}>
        <Grid.Col lg={5}>
          <TextInput
            placeholder="レシピ名で検索"
            {...form.getInputProps('keyword')}
          />
        </Grid.Col>
        <Grid.Col lg={5}>
          <MultiSelect
            data={categoryList}
            placeholder="カテゴリで検索"
            searchable
            clearable
            maxSelectedValues={3}
            {...form.getInputProps('categoryIds')}
          />
        </Grid.Col>
        <Grid.Col lg={2}>
          <Button
            color="teal"
            disabled={recipesLoading}
            onClick={refetchRecipes}
          >
            検索
          </Button>
        </Grid.Col>
      </Grid>
      {recipesLoading && (
        <Center>
          <Loader color="teal" size="lg" />
        </Center>
      )}
      {!recipesLoading && recipesData && (
        <>
          {recipesData.recipes.length === 0 ? (
            <Center>
              <Text weight={800} size="xl">
                レシピが見つかりませんでした
              </Text>
            </Center>
          ) : (
            <Grid>
              {recipesData.recipes.map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
              ))}
            </Grid>
          )}
        </>
      )}
    </BaseLayout>
  );
};

export default Recipes;
