import type { NextPage } from 'next';

import { BaseLayout } from 'layouts/BaseLayout';
import { RecipeItem } from 'components/Card';

const recipes = [
  {
    title:
      'With Fjord Tours you can explore more of the magical fjord Tours you can explore more of the magical fjord',
    image: './vercel.svg',
    createdAt: '2022/04/22',
  },
  {
    title:
      'With Fjord Tours you can explore more of the magical fjord Tours you can explore more of the magical fjord',
    image: './vercel.svg',
    createdAt: '2022/04/22',
  },
  {
    title:
      'With Fjord Tours you can explore more of the magical fjord Tours you can explore more of the magical fjord',
    image: './vercel.svg',
    createdAt: '2022/04/22',
  },
  {
    title:
      'With Fjord Tours you can explore more of the magical fjord Tours you can explore more of the magical fjord',
    image: './vercel.svg',
    createdAt: '2022/04/22',
  },
];

type RecipeType = {
  title: string;
  image: string;
  createdAt: string;
};

const Recipe: NextPage = () => {
  return (
    <BaseLayout title="レシピを探す">
      <div className="flex flex-wrap">
        {recipes.map((recipe: RecipeType, index) => (
          <RecipeItem
            key={index}
            title={recipe.title}
            image={recipe.image}
            createdAt={recipe.createdAt}
          />
        ))}
      </div>
    </BaseLayout>
  );
};

export default Recipe;
