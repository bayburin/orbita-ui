import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimWorkflowInfoComponent } from './claim-workflow-info.component';

describe('ClaimWorkflowInfoComponent', () => {
  let component: ClaimWorkflowInfoComponent;
  let fixture: ComponentFixture<ClaimWorkflowInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimWorkflowInfoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimWorkflowInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
