import { gql } from 'apollo-angular';

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      description
      userId {
        id
        name
        email
      }
      comments {
        id
        data
        userId {
          id
          name
          email
        }
        timestamp
      }
      timestamp
    }
  }
`;
