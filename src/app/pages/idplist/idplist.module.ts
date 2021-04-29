import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IdpListComponent} from './idplist.component';
import { IdpListRoutingModule } from './idplist-routing.module';

@NgModule({
    declarations: [IdpListComponent],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        IdpListRoutingModule
    ],
    providers: [],
})
export class IdpListModule { }
