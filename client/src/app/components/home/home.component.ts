import { Component } from '@angular/core';
import { Post } from 'src/app/store/posts/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  update_post: Post;
  updatePost(post: Post) {
    this.update_post = post;
  }
}
