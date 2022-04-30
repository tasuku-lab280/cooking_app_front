import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { Grid } from '@mantine/core';

import { RecipeItem } from 'components/RecipeItem';
import { SkeletonItem } from 'components/RecipeItem/SkeltonItem';
import { BaseLayout } from 'layouts/BaseLayout';
import { RecipesQuery } from 'services/graphql/types/generated';
import { withCurrentUser } from 'utils/withCurrentUser';

const RECIPES_QUERY = gql`
  query RecipesQuery {
    recipes {
      id
      title
      image
      createdAtText
      likeCount
      favoriteCount
      user {
        id
        nickname
        image
      }
      tags {
        id
        name
      }
    }
  }
`;

const Recipes: NextPage = () => {
  const { data, loading } = useQuery<RecipesQuery>(RECIPES_QUERY);

  return (
    <BaseLayout>
      <Grid>
        {loading &&
          [...Array(5)].map((_, index) => <SkeletonItem key={index} />)}
        {data && (
          <>
            {data.recipes.map((recipe) => (
              <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
          </>
        )}
      </Grid>
    </BaseLayout>
  );
};

export default withCurrentUser(Recipes);
