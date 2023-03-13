import { CommentState } from './comments/comment.state';
import { PostState } from './posts/post.state';
import { UserState } from './users/user.state';

export interface AppState {
  postState: PostState;
  commentState: CommentState;
  userState: UserState;
}
