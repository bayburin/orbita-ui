import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@shared/material.module';

import { EmployeeMiniCardComponent } from './employee-mini-card.component';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';

fdescribe('EmployeeMiniCardComponent', () => {
  let component: EmployeeMiniCardComponent;
  let fixture: ComponentFixture<EmployeeMiniCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [EmployeeMiniCardComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMiniCardComponent);
    component = fixture.componentInstance;
    component.employee = new IBaseEmployeeBuilder().testBuild();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
