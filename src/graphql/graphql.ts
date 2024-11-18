import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      displayName
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      displayName
      createdAt
      posts {
        id
        content
        createdAt
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
  posts {
    id
    title
    content
    created_at
  }
}
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
  insert_posts(objects: { title: $title, content: $content }) {
    returning {
      id
      title
    }
  }
}
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $content: String!) {
    updatePost(id: $id, content: $content) {
      id
      content
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($displayName: String!) {
    updateProfile(displayName: $displayName) {
      id
      displayName
    }
  }
`;