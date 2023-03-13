import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/store/posts/post.model';
import * as postActions from '../../store/posts/post.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent {
  myForm: FormGroup;

  ngOnInit() {
    this.myForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      userId: {
        id: '640eea0a0af8537bdbc41942',
        name: 'Divyanshu Pandey',
        email: 'divyanshu@gmail.com',
      },
    });
  }

  addPost(form: FormGroup) {
    const newPost: Partial<Post> = {
      title: form.value.title,
      description: form.value.description,
      userId: {
        id: '640eea0a0af8537bdbc41942',
        name: 'Divyanshu Pandey',
        email: 'divyanshu@gmail.com',
      },
    };

    this.store.dispatch(postActions.addPost({ payload: newPost }));
    this.myForm.reset();
  }

  // post: Partial<Post> = {
  //   title: 'New Title',
  //   description: 'New Description',
  //   userId: {
  //     id: '640eea0a0af8537bdbc41942',
  //     name: 'Divyanshu Pandey',
  //     email: 'divyanshu@gmail.com',
  //   },
  // };

  // addPost() {
  //   this.store.dispatch(postActions.addPost({ payload: this.post }));
  // }

  constructor(
    private store: Store<{ posts: Post[] }>,
    private fb: FormBuilder
  ) {}
}
