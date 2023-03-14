import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/store/posts/post.model';
import * as postActions from '../../store/posts/post.actions';
import { Store } from '@ngrx/store';
import { UpdateBehaviorService } from 'src/app/services/update-behavior.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent {
  // @Input() update_post: Partial<Post> = {
  //   id: '',
  //   title: '',
  //   description: '',
  // };
  temp_post_id: string = '';
  temp_post_title: string = '';
  temp_post_description: string = '';
  show = false;

  hideComponent() {
    this.updateBehaviourService.update_show$.next(false);
    this.updateBehaviourService.update_id$.next('');
    this.updateBehaviourService.update_title$.next('');
    this.updateBehaviourService.update_description$.next('');
  }

  // hideComponent() {
  //   this.update_post = {
  //     id: '',
  //     title: '',
  //     description: '',
  //   };
  // }

  // getUpdatePost(post: Partial<Post>) {
  //   if (this.temp_post_id === '') {
  //     let temp_post = JSON.parse(JSON.stringify(post));
  //     this.temp_post_id = temp_post.id;
  //     this.temp_post_title = temp_post.title;
  //     this.temp_post_description = temp_post.description;
  //   }
  // }

  updatePost(id: string, title: string, description: string) {
    console.log(id, title, description);
    let temp_post: Partial<Post> = {
      id,
      title,
      description,
    };
    this.store.dispatch(postActions.updatePost({ payload: temp_post }));
    this.hideComponent();
  }

  constructor(
    private store: Store<{ posts: Post[] }>,
    private updateBehaviourService: UpdateBehaviorService
  ) {
    this.updateBehaviourService.update_id$.subscribe((id) => {
      this.temp_post_id = id;
    });
    this.updateBehaviourService.update_show$.subscribe((show) => {
      this.show = show;
    });
    this.updateBehaviourService.update_title$.subscribe((value) => {
      this.temp_post_title = value;
    });
    this.updateBehaviourService.update_description$.subscribe((value) => {
      this.temp_post_description = value;
    });
  }
}
