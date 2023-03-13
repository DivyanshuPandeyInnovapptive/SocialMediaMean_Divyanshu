import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/store/posts/post.model';
import * as postsActions from '../../store/posts/post.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  // posts$: Observable<Post[]> = this.apiService.getPosts();

  // constructor(private apiService: ApiServiceService) {}

  posts$: Observable<Post[]> = this.store.select('posts');

  constructor(private store: Store<{ posts: Post[] }>) {}

  ngOnInit() {
    this.store.dispatch(postsActions.getPosts());
  }
}
