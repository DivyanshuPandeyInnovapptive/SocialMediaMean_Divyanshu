import { createAction, props } from '@ngrx/store';
import { Post } from './post.model';

export const getPosts = createAction('[Posts Component] Get_Posts');
export const getPostsLoaded = createAction(
  '[Posts Component] Get_Posts_Loaded',
  props<{ payload: Post[] }>()
);
export const getPostsError = createAction('[Posts Component] Get_Posts_Error');

export const addPost = createAction(
  '[Posts Component] Add_Post',
  props<{ payload: Partial<Post> }>()
);
export const addPostLoaded = createAction(
  '[Posts Component] Add_Post_Loaded',
  props<{ payload: Post }>()
);

export const updatePost = createAction(
  '[Posts Component] Update_Post',
  props<{ payload: Partial<Post> }>()
);

export const updatePostSuccess = createAction(
  '[Posts Component] Update_Post_Success',
  props<{ payload: Post }>()
);

export const deletePost = createAction(
  '[Posts Component] Delete_Post',
  props<{ id: string }>()
);

export const deletePostSuccess = createAction(
  '[Posts Component] Delete_Post_Success',
  props<{ payload: Partial<Post> }>()
);
