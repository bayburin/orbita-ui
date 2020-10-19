import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPageComponent } from './claim-page.component';

describe('ClaimPageComponent', () => {
  let component: ClaimPageComponent;
  let fixture: ComponentFixture<ClaimPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
