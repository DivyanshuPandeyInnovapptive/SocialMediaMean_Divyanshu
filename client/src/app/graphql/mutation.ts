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

export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $description: String!) {
    updatePost(id: $id, title: $title, description: $description) {
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

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

// comment
export const ADD_COMMENT = gql`
  mutation addComment($data: String!, $userId: ID!, $postId: ID!) {
    addComment(data: $data, userId: $userId, postId: $postId) {
      id
      data
      userId {
        id
        name
        email
      }
      postId {
        id
      }
      timestamp
    }
  }
`;
