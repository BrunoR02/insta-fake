import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Post, { PostInput } from '../interfaces/Post';

import {Observable,} from "rxjs"
import Response from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public posts:Post[] = []
  public isLoading: boolean = false

  constructor(private http: HttpClient) { }

  getPostsByAuthor(search: string):Observable<Post[]>{
    const observable = this.http.post<Post[]>("http://localhost:3000/posts",{searchValue:search},{headers:{"Content-Type": "application/json"}})
    return observable
  }

  setIsLoading(value:boolean){
    this.isLoading = value
  }

  setPosts(posts:Post[]){
    this.posts = posts
  }
  
  addPost(post:PostInput):Observable<Response>{
    const formData = new FormData()

    formData.append("author",post.author)
    formData.append("description",post.description)
    formData.append("postImage",post.postImage)

    return this.http.post<Response>("http://localhost:3000/add-post",formData)
  }
}
