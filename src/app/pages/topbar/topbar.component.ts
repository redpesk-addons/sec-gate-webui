import { Component,  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AfbWsService } from '../services/afb-ws.service';

@Component({
  selector: 'afb-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

export class TopBarComponent implements OnInit {

  user$: Observable<string>;
  status$: Observable<any>;

  constructor(
    private afbWS: AfbWsService,
  ) {
    this.user$ = this.afbWS.getUser();
    this.status$ = this.afbWS.get().Status$;
  }

  ngOnInit(): void { }

}
