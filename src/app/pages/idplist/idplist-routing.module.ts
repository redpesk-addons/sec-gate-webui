import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdpListComponent } from './idplist.component';

const routes: Routes = [
    {
        path: '',
        component: IdpListComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IdpListRoutingModule { }
