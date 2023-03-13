import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostState } from './post.state';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(
  selectPostState,
  (state) => state.posts
);
