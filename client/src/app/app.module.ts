import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { ShareComponent } from './pages/share/share.component';
import { ShareFormComponent } from './components/forms/share-form/share-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { LoadingSpinnerComponent } from './components/layout/loading-spinner/loading-spinner.component';
import { SearchPostComponent } from './components/search/search-post/search-post.component';
import {MatIconModule} from "@angular/material/icon";
import { PostComponent } from './pages/post/post.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostListComponent,
    ShareComponent,
    ShareFormComponent,
    LoadingSpinnerComponent,
    SearchPostComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
