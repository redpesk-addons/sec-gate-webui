
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotfoundComponent } from '../notfound/notfound.component';
import { GithubLoginComponent } from './login/github-login.component';

const routes: Routes = [
    { path: 'login', component: GithubLoginComponent },
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
export class GithubRoutingModule {
}
