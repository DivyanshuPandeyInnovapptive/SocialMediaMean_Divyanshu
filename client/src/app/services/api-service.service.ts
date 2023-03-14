import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_POSTS } from '../graphql/queries';
import { Observable, map } from 'rxjs';
import { Post } from '../store/posts/post.model';
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
} from '../graphql/mutation';
import { Comment } from '../store/comments/comment.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  addPost(post: Partial<Post>): Observable<Post> {
    return this.apollo
      .mutate({
        mutation: ADD_POST,
        variables: {
          title: post.title,
          description: post.description,
          userId: post.userId?.id,
        },
      })
      .pipe(
        map((result: any) => {
          // console.log('Result', result);
          return result.data.addPost;
        })
      );
  }

  updatePost(post: Partial<Post>): Observable<Post> {
    return this.apollo
      .mutate({
        mutation: UPDATE_POST,
        variables: {
          id: post.id,
          title: post.title,
          description: post.description,
        },
      })
      .pipe(
        map((result: any) => {
          return result.data.updatePost;
        })
      );
  }

  getPosts(): Observable<Post[]> {
    return this.apollo.query({ query: GET_POSTS }).pipe(
      map((result: any) => {
        return result.data.posts;
      })
    );
  }

  deletePost(id: string): Observable<Partial<Post>> {
    return this.apollo
      .mutate({
        mutation: DELETE_POST,
        variables: {
          id,
        },
      })
      .pipe(
        map((result: any) => {
          console.log('Delete Result', result);
          return result.data.deletePost;
        })
      );
  }

  // add comment
  addComment(
    data: string,
    userId: string,
    postId: string
  ): Observable<Comment> {
    console.log(data, userId, postId);
    return this.apollo
      .mutate({
        mutation: ADD_COMMENT,
        variables: {
          data: data,
          userId: userId,
          postId: postId,
        },
      })
      .pipe(
        map((result: any) => {
          return result.data.addComment;
        })
      );
  }

  constructor(private apollo: Apollo) {}
}
