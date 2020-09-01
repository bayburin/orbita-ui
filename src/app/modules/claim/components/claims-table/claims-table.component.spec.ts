import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';

import { ClaimsTableComponent } from './claims-table.component';
import { Claim } from '@modules/claim/models/claim/claim.model';

describe('ClaimsTableComponent', () => {
  let component: ClaimsTableComponent;
  let fixture: ComponentFixture<ClaimsTableComponent>;
  let claims: Claim[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimsTableComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsTableComponent);
    component = fixture.componentInstance;
    claims = [new Claim({ id: 1, service_name: 'Test name' })];
    component.dataSource = new MatTableDataSource(claims);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
