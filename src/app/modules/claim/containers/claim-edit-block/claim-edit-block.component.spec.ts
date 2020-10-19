import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEditBlockComponent } from './claim-edit-block.component';

describe('ClaimEditBlockComponent', () => {
  let component: ClaimEditBlockComponent;
  let fixture: ComponentFixture<ClaimEditBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimEditBlockComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEditBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
