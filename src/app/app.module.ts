import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { TopBarComponent } from './pages/topbar/topbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RegisterModule } from './pages/register/register.module';
import { IdpListModule } from './pages/idplist/idplist.module';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    TopBarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RegisterModule,
    IdpListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
