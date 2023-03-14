import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/store/posts/post.model';
import * as postsActions from '../../store/posts/post.actions';
import { Observable } from 'rxjs';
import { PostState } from 'src/app/store/posts/post.state';
import { selectPosts } from 'src/app/store/posts/post.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  user_id = '640eea0a0af8537bdbc41942';
  temp_comments: any = {};

  @Output() updatePostEvent = new EventEmitter<Post>();

  updatePost(post: Post) {
    this.updatePostEvent.emit(post);
  }

  addComment(id: string) {
    // console.log(id, this.temp_comments[id]);
    console.log(this.temp_comments[id], this.user_id, id);
    this.store.dispatch(
      postsActions.addComment({
        data: this.temp_comments[id],
        userId: this.user_id,
        postId: id,
      })
    );
    this.temp_comments[id] = '';
  }
  // posts$: Observable<Post[]> = this.apiService.getPosts();

  // constructor(private apiService: ApiServiceService) {}

  posts$: Observable<Post[]> = this.store.select(selectPosts);

  deletePost(id: string) {
    this.store.dispatch(postsActions.deletePost({ id }));
  }

  constructor(private store: Store<{ posts: Post[] }>) {}

  ngOnInit() {
    this.store.dispatch(postsActions.getPosts());
  }
}
