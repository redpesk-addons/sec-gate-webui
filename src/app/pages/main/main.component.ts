import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AFBWebSocketService } from 'afbwebsocket';

export interface IBoardInfo {
  general: {
    serial: string;
    mac: string;
  },
  disk_usage: [
    {
      partition: string;
      name: string;
      usage: string
    }
  ],
  redpesk: {
    distribution: string;
    version_id: string;
  },
  recovery: {
    distribution: string;
    version_id: string;
  },
  boot_flags: {
    counter: string;
    limit: string;
    upgrade_available: string;
  }
}

@Component({
  selector: 'afb-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {



  constructor(
    private afbService: AFBWebSocketService,
    private render: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    // afbService.Init('api', 'HELLO');
  }

  ngOnInit(): void {

  }


}
