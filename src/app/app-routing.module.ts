import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdpListComponent } from './pages/idplist/idplist.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
    {
        path: 'idplist',
        loadChildren: () => import('./pages/idplist/idplist.module').then(m => m.IdpListModule)
    },
    {
        path: 'pam',
        loadChildren: () => import('./pages/pam/pam.module').then(m => m.PamModule)
    },
    {
        path: 'github',
        loadChildren: () => import('./pages/github/github.module').then(m => m.GithubModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
    },
    {
        path: '**',
        component: NotfoundComponent,
        // outlet: "top-bar",
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        enableTracing: false,
        useHash: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
