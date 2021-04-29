import { NgModule } from "@angular/core";
import { PamRoutingModule } from "./pam-routing.module";
import { PamComponent } from "./pam.component";
import { PasswordModule } from "./password/password.module";

@NgModule({
    imports: [
        PamRoutingModule,
        PasswordModule
    ],
    declarations: [
        PamComponent,
      ],
})

export class PamModule { }
