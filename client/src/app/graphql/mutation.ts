import { gql } from 'apollo-angular';

export const ADD_POST = gql`
  mutation addPost($title: String!, $description: String!, $userId: ID!) {
    addPost(title: $title, description: $description, userId: $userId) {
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
