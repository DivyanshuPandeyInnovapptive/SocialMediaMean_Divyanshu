import { createAction, props } from '@ngrx/store';
import { Post } from './post.model';

export const getPosts = createAction('[Posts Component] Get_Posts');
export const getPostsLoaded = createAction(
  '[Posts Component] Get_Posts_Loaded',
  props<{ payload: Post[] }>()
);
export const getPostsError = createAction('[Posts Component] Get_Posts_Error');
