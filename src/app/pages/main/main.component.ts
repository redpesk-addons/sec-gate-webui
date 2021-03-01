import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AfbWsService } from '../services/afb-ws.service';

@Component({
  selector: 'afb-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {

  user$: Observable<string>;
  status$: Observable<any>;

  constructor(
    private afbWS: AfbWsService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.user$ = this.afbWS.getUser();
    this.status$ = this.afbWS.get().Status$;
  }

  ngOnInit(): void {}

}
