import { gql } from 'apollo-angular';

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      description
      userId {
        id
      }
      comments {
        id
      }
      timestamp
    }
  }
`;
