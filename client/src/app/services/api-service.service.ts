import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_POSTS } from '../graphql/queries';
import { Observable, map } from 'rxjs';
import { Post } from '../store/posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private apollo: Apollo) {}

  getPosts(): Observable<Post[]> {
    return this.apollo.query({ query: GET_POSTS }).pipe(
      map((result: any) => {
        return result.data.posts;
      })
    );
  }
}
