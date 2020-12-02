import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@shared/material.module';
import { ClaimWorkflowInfoComponent } from './claim-workflow-info.component';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';
import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';

describe('ClaimWorkflowInfoComponent', () => {
  let component: ClaimWorkflowInfoComponent;
  let fixture: ComponentFixture<ClaimWorkflowInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ClaimWorkflowInfoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimWorkflowInfoComponent);
    component = fixture.componentInstance;
    component.claim = ClaimFactory.create(ClaimTypes.SD_REQUEST);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
