import { Component, OnInit } from '@angular/core';
import { PostInput } from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';
import {MatSnackBar} from "@angular/material/snack-bar"
import { Router } from '@angular/router';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.sass']
})
export class ShareComponent implements OnInit {

  isLoading = false

  constructor(private postService: PostsService,private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(post:PostInput){
    this.isLoading = true
    this.postService.addPost(post).subscribe(response=>{
      this.snackBar.open(response.message,undefined,{duration:3000,panelClass:"custom-snackbar"})
      this.isLoading = false
      this.router.navigate([""])
    })
  }
}
