
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PasswordComponent } from './password/password.component';
import { NotfoundComponent } from '../notfound/notfound.component';

const routes: Routes = [
    {
      path: 'password',
      component: PasswordComponent },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: NotfoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PamRoutingModule {
}
