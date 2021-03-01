import { TestBed } from '@angular/core/testing';

import { AfbWsService } from './afb-ws.service';

describe('AfbWsService', () => {
  let service: AfbWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfbWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
