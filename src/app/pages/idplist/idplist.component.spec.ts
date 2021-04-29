import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpListComponent } from './idplist.component';

describe('IdpListComponent', () => {
  let component: IdpListComponent;
  let fixture: ComponentFixture<IdpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdpListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
