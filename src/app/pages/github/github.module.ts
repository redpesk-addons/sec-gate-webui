import { NgModule } from "@angular/core";
import { GithubRoutingModule } from "./github-routing.module";
import { GithubComponent } from "./github.component";
import { GithubLoginModule } from "./login/github-login.module";

@NgModule({
    imports: [
        GithubRoutingModule,
        GithubLoginModule,
    ],
    declarations: [
        GithubComponent,
      ],
})

export class GithubModule { }
