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
  })
);
