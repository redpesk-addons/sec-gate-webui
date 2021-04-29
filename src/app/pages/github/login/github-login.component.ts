import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'afb-github-login',
  templateUrl: './github-login.component.html',
  styleUrls: ['./github-login.component.scss']
})
export class GithubLoginComponent implements OnInit {

  constructor(
    private location: Location
    ) {

    }

  ngOnInit(): void {
  }

  goBack(){
      this.location.back();
  }

}
