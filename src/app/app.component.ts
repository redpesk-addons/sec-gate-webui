import { Component } from '@angular/core';

@Component({
  selector: 'afb-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'afb-oidc';
}
