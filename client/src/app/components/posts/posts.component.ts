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

  @Output() updatePostEvent = new EventEmitter<Post>();

  updatePost(post: Post) {
    this.updatePostEvent.emit(post);
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
