import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';

import { BaseLayout } from 'layouts/BaseLayout';
import { RecipeItem } from 'components/Card';

const RECIPES_QUERY = gql`
  query RecipesQuery {
    recipes {
      id
      title
      image
      createdAtText
      like_count
      favorite_count
      user {
        id
        nickname
      }
    }
  }
`;

type RecipeType = {
  title: string;
  image: string;
  createdAt: string;
};

const Recipe: NextPage = () => {
  const { data, loading } = useQuery(RECIPES_QUERY);

  return (
    <BaseLayout title="レシピを探す">
      {loading && <div>ローディング中です</div>}
      {!loading && data && (
        <div className="flex flex-wrap">
          {data.recipes.map((recipe: RecipeType, index: string) => (
            <RecipeItem
              key={index}
              title={recipe.title}
              image={recipe.image}
              createdAt={recipe.createdAt}
            />
          ))}
        </div>
      )}
    </BaseLayout>
  );
};

export default Recipe;
