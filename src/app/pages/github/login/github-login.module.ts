import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubLoginComponent } from './github-login.component';



@NgModule({
  declarations: [GithubLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class GithubLoginModule { }
