import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, of, switchMap } from 'rxjs';
import Post from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.sass']
})
export class SearchPostComponent implements OnInit {
  searchValue: string = ""

  public search = new FormControl('')
  public posts$: Observable<Post[]>

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.search.valueChanges.pipe(
      debounceTime(500),
      switchMap(next=>{
        this.postService.setIsLoading(true)
        return this.postService.getPostsByAuthor(next)
      })
    )
    this.posts$.subscribe(value=>{
      this.postService.setPosts(value)
      this.postService.setIsLoading(false)
    })
  }

}
