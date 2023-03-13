import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/services/api-service.service';
import * as postsActions from './post.actions';
import { Post } from './post.model';

@Injectable()
export class PostsEffects {
  constructor(
    private apiService: ApiServiceService,
    private actions$: Actions
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Posts Component] Get_Posts'),
      mergeMap(() =>
        this.apiService
          .getPosts()
          .pipe(map((posts) => postsActions.getPostsLoaded({ payload: posts })))
      )
    )
  );

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Posts Componenet] Add_Post'),
      map((action: { payload: Partial<Post> }) => action.payload),
      mergeMap((post) =>
        this.apiService
          .addPost(post)
          .pipe(map((post) => postsActions.addPostLoaded({ payload: post })))
      )
    );
  });
}
