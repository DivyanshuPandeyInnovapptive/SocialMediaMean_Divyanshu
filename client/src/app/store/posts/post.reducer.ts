import { createReducer, on } from '@ngrx/store';
import * as postActions from './post.actions';
import { initialState } from './post.state';

export const postsReducer = createReducer(
  initialState,
  on(postActions.getPosts, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(postActions.getPostsLoaded, (state, action) => {
    return {
      ...state,
      posts: action.payload,
      loading: false,
    };
  }),
  on(postActions.addPost, (state, action) => {
    return {
      ...state,
    };
  }),
  on(postActions.addPostLoaded, (state, action) => {
    return {
      ...state,
      posts: [...state.posts, action.payload],
    };
  }),
  on(postActions.updatePost, (state, action) => {
    return {
      ...state,
    };
  }),
  on(postActions.updatePostSuccess, (state, action) => {
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id === action.payload.id) return action.payload;
        else return post;
      }),
    };
  }),
  on(postActions.deletePost, (state, action) => {
    return {
      ...state,
    };
  }),
  on(postActions.deletePostSuccess, (state, action) => {
    return {
      ...state,
      posts: state.posts.filter((post) => post.id !== action.payload.id),
    };
  })
);
