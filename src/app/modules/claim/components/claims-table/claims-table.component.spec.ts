import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MaterialModule } from '@shared/material.module';
import { ClaimsTableComponent } from './claims-table.component';
import { Claim } from '@modules/claim/models/claim/claim.model';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';
import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';
import { DatetimePipe } from '@shared/pipes/datetime/datetime.pipe';
import { ISdRequestBuilder } from '@modules/sd-request/builders/i-sd-request.builder';

describe('ClaimsTableComponent', () => {
  let component: ClaimsTableComponent;
  let fixture: ComponentFixture<ClaimsTableComponent>;
  let claims: Claim[];
  let selected: Claim;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ClaimsTableComponent, DatetimePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsTableComponent);
    component = fixture.componentInstance;
    claims = [ClaimFactory.create(ClaimTypes.SD_REQUEST, new ISdRequestBuilder().testBuild())];
    component.dataSource = new MatTableDataSource(claims);
    selected = claims[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#toggleRow', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(component.onselect, 'emit');
      component.toggleRow(selected);
    });

    it('should set null to expandedEl attribute if element already is opened', () => {
      component.toggleRow(selected);

      expect(component.expandedEl).toBeNull();
    });

    describe('when element is closed', () => {
      it('should set received element to expandedEl attribute', () => {
        expect(component.expandedEl).toEqual(selected);
      });

      it('should emit id of element', () => {
        expect(spy).toHaveBeenCalledWith(selected.id);
      });
    });
  });

  describe('#isSelected', () => {
    it('should return true if received element is equal to expandedEl attribute', () => {
      component.toggleRow(selected);

      expect(component.isSelected(selected)).toBeTrue();
    });

    it('should return false in another cases', () => {
      expect(component.isSelected(selected)).toBeFalse();
    });
  });
});
