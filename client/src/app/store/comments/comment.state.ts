import { Comment } from './comment.model';

export interface CommentState {
  comments: Comment[];
}

export const initialState: CommentState = {
  comments: [],
};
