import { gql, useQuery } from '@apollo/client';

import { CategoriesQuery } from 'services/graphql/types/generated';

const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

export const useCategory = () => {
  const { data, loading } = useQuery<CategoriesQuery>(CATEGORIES_QUERY);

  return { data, loading };
};
