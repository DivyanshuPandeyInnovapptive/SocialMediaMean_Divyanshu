import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/services/api-service.service';
import * as postsActions from './post.actions';
import { of } from 'rxjs';

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
}
