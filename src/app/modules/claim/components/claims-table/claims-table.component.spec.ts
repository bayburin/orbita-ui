import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';

import { ClaimsTableComponent } from './claims-table.component';
import { Claim } from '@modules/claim/models/claim/claim.model';

describe('ClaimsTableComponent', () => {
  let component: ClaimsTableComponent;
  let fixture: ComponentFixture<ClaimsTableComponent>;
  let claims: Claim[];
  let selected: Claim;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimsTableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsTableComponent);
    component = fixture.componentInstance;
    claims = [new Claim({ id: 1, service_name: 'Test name' })];
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
