import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';

import { RecipeItem } from 'components/Card';
import { BaseLayout } from 'layouts/BaseLayout';
import { RecipesQuery } from 'services/graphql/generated';

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
      }
    }
  }
`;

const Recipe: NextPage = () => {
  const { data, loading } = useQuery<RecipesQuery>(RECIPES_QUERY);

  return (
    <BaseLayout title="レシピを探す">
      {loading && <div>ローディング中です</div>}
      {data && (
        <div className="flex flex-wrap">
          {data.recipes.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              createdAt={recipe.createdAtText}
            />
          ))}
        </div>
      )}
    </BaseLayout>
  );
};

export default Recipe;
