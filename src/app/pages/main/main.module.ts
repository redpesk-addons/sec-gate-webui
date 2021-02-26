import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AfbwebsocketModule } from 'afbwebsocket';
import { LoginComponent } from '../login/login.component';



@NgModule({
  declarations: [MainComponent, LoginComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    AfbwebsocketModule,
    NgbTooltipModule,
  ]
})
export class MainModule { }
