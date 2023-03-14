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
      ofType('[Posts Component] Add_Post'),
      map((action: { payload: Partial<Post> }) => action.payload),
      mergeMap((post) =>
        this.apiService
          .addPost(post)
          .pipe(map((post) => postsActions.addPostLoaded({ payload: post })))
      )
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Posts Component] Update_Post'),
      map((action: { payload: Partial<Post> }) => action.payload),
      mergeMap((post) =>
        this.apiService
          .updatePost(post)
          .pipe(
            map((post) => postsActions.updatePostSuccess({ payload: post }))
          )
      )
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Posts Component] Delete_Post'),
      map((action: { id: string }) => action.id),
      mergeMap((id) =>
        this.apiService
          .deletePost(id)
          .pipe(
            map((post) => postsActions.deletePostSuccess({ payload: post }))
          )
      )
    );
  });

  // comment
  addComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Posts Component] Add_Comment'),
      map((action: { data: string; userId: string; postId: string }) => {
        return {
          data: action.data,
          userId: action.userId,
          postId: action.postId,
        };
      }),
      mergeMap((comment) => {
        return this.apiService
          .addComment(comment.data, comment.userId, comment.postId)
          .pipe(
            map((comment) =>
              postsActions.addCommentSuccess({
                id: comment.id,
                postId: {
                  id: comment.postId.id,
                },
                data: comment.data,
                userId: {
                  id: comment.userId.id,
                  name: comment.userId.name,
                  email: comment.userId.email,
                },
                timestamp: comment.timestamp,
              })
            )
          );
      })
    );
  });
}
