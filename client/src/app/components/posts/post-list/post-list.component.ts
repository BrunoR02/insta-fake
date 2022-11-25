import { Component, OnInit } from '@angular/core';
import Post from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';
import {map} from "rxjs/operators"

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  constructor(public postService:PostsService) { }

  ngOnInit(): void {
  }
}
