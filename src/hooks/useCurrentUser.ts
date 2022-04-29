import { gql, useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    currentUser {
      id
      email
      nickname
    }
  }
`;

export const useCurrentUser = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  const currentUser = data?.currentUser;

  return { currentUser, loading, error };
};
