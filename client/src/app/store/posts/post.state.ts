import { Post } from './post.model';

export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: [],
};
