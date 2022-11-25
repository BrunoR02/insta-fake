import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms"
import Post, { PostInput } from 'src/app/interfaces/Post';

@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: ['./share-form.component.sass']
})
export class ShareFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<PostInput>()

  shareForm!: FormGroup
  filename: string | null = null
  previewImage: string = ""

  constructor() { }

  ngOnInit(): void {
    this.shareForm = new FormGroup({
      author: new FormControl("",Validators.required),
      description: new FormControl(""),
      image: new FormControl("")
    })
  }

  get author(){
    return this.shareForm.get("author")!
  }
  get description(){
    return this.shareForm.get("description")!
  }

  onFileChanged(event: any){
    const file: File = event.target.files[0]
    if(FileReader && file){
      this.filename = file.name
      this.shareForm.patchValue({image:file})

      const reader = new FileReader()
      reader.onload = e => this.previewImage = reader.result as string

      reader.readAsDataURL(file)
    }
  }

  submit(e:Event){
    e.preventDefault()
    if(this.shareForm.invalid) return
    const post:PostInput = {
      author: this.author.value,
      description:this.description.value,
      postImage: this.shareForm.value.image
    }
    this.onSubmit.emit(post)
  }
}
