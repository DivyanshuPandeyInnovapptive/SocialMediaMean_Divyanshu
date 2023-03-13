import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_POSTS } from '../graphql/queries';
import { Observable, map } from 'rxjs';
import { Post } from '../store/posts/post.model';
import { ADD_POST, DELETE_POST } from '../graphql/mutation';

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

  constructor(private apollo: Apollo) {}
}
