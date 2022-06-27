import { gql, useQuery } from '@apollo/client';

import { CurrentUserQuery } from 'services/graphql/types/generated';

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      accountId
      nickname
    }
  }
`;

export const useCurrentUser = () => {
  const { data, loading, error } =
    useQuery<CurrentUserQuery>(CURRENT_USER_QUERY);
  const currentUser = data?.currentUser;

  return { currentUser, loading, error };
};
