import { Component } from '@angular/core';

@Component({
  selector: 'afb-root',
  template: `
    <afb-topbar></afb-topbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <afb-footer></afb-footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'afb-oidc';
}
